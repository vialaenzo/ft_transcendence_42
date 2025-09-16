import { FastifyPluginAsync } from "fastify";
import {
	createUser,
	getUser,
	googleSignIn,
	verifyUser,
} from "../services/userService";

import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

import {
	User,
	Credential,
	Credential2FA,
	UserCreate,
	UserAuth,
	GoogleData,
} from "../types/types";

import {
	createSchema,
	authSchema,
	auth2FASchema,
} from "../validations/userSchema";

import {
	authUser,
	getUserAuth,
	updateConfig,
	generate2FA,
	updateToken,
} from "../services/authService";

const auth: FastifyPluginAsync = async (fastify) => {
	const googleClient = new OAuth2Client(
		process.env.GOOGLE_OAUTH_ID,
		process.env.GOOGLE_OAUTH_SECRET,
		process.env.GOOGLE_OAUTH_URI
	);

	fastify.get("/google", async (request, reply) => {
		const url = googleClient.generateAuthUrl({
			access_type: "offline",
			scope: ["profile", "email"],
		});
		reply.send({ url });
	});

	fastify.get("/google/callback", async (request, reply) => {
		const { code } = request.query as { code: string };

		try {
			const { tokens } = await googleClient.getToken(code);
			googleClient.setCredentials(tokens);

			const oauth2 = google.oauth2({
				auth: googleClient,
				version: "v2",
			});

			const { data } = await oauth2.userinfo.get();
			const googleData: GoogleData = data as GoogleData;
			if (!data)
				return reply.status(500).send({ error: "Authentication failed" });

			const user = (await googleSignIn(googleData)) as User;

			if (user) {
				const token = fastify.jwt.sign({ email: user.email });
				await updateToken(user.id, token);
				reply.redirect(
					process.env.FRONT_URL + "/?token=" + token + "&id=" + user.id
				);
			} else {
				reply.status(403).send({ error: "User not authorized" });
			}
		} catch (err) {
			console.error("Error during authentication:", err);
			reply.status(500).send({ error: "Authentication failed" });
		}
	});

	fastify.post(
		"/register",
		{ schema: createSchema },
		async (request, reply) => {
			const userData: UserCreate = request.body as UserCreate;
			const user: User = await createUser(userData);
			if (!user) throw new Error("Fail to register user");
			const userAuth = (await getUserAuth(user.name)) as UserAuth;
			await generate2FA(userAuth);
			reply.send({ ...user });
		}
	);

	fastify.post("/login", { schema: authSchema }, async (request, reply) => {
		const { name, password } = request.body as Credential;
		const userAuth: UserAuth = (await getUserAuth(name)) as UserAuth;
		if (!userAuth) throw Error("Pas trouve =(");

		const check: boolean = await authUser(password, userAuth);
		if (!check) throw new Error("Invalid password");

		const user = await getUser({ id: userAuth.id });
		if (!user) throw new Error("Couldn't find user.");

		if (userAuth.configuration.is2FA || !userAuth.verify) {
			await generate2FA(userAuth);
			reply.send({ ...user });
			return;
		}

		const token = fastify.jwt.sign({ email: user.email });
		await updateToken(userAuth.id, token);

		reply.send({ ...user, token });
	});

	fastify.post("/2FA", { schema: auth2FASchema }, async (request, reply) => {
		const { code, name, type } = request.body as Credential2FA;
		const userAuth: UserAuth = (await getUserAuth(name)) as UserAuth;

		if (code === userAuth.configuration.code2FA) {
			userAuth.configuration.code2FA = "";
			await updateConfig(userAuth.configuration);

			if (type === "REGISTER" || !userAuth.verify)
				await verifyUser(userAuth.id);

			const token = fastify.jwt.sign({ email: userAuth.email });
			await updateToken(userAuth.id, token);
			reply.send({ token });
			return;
		}

		reply.status(403).send({ message: "Invalid 2FA code" });
	});
};

export default auth;
