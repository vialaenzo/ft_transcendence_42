import path from "path";
import fs from "fs";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from "@fastify/static";
import fastifyMultipart from "@fastify/multipart";
import crud from "./routes/crud";
import auth from "./routes/auth";
import socket from "./routes/socket";
import { errorHandler } from "./errors/errorHandler";
import fastifyWebsocket from "@fastify/websocket";
import cors from "@fastify/cors";
import Ajv from "ajv";
import ajvFormats from "ajv-formats";

export const ajv = new Ajv();
ajvFormats(ajv);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const app = fastify({
	https: {
		key: fs.readFileSync(process.env.HTTPS_KEY as string),
		cert: fs.readFileSync(process.env.HTTPS_CERT as string),
	},
});

app.register(fastifyStatic, {
	root: path.join(path.dirname(__dirname), "storage"),
	prefix: "/download/",
	setHeaders: (res, path, stat) => {
		res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		res.setHeader("Pragma", "no-cache");
		res.setHeader("Expires", "0");
	},
});

app.register(cors, {
	origin: "*",
	optionsSuccessStatus: 200,
	methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	preflightContinue: false,
});

app.register(fastifyWebsocket);

app.register(fastifyJwt, {
	secret: process.env.JWT_KEY as string,
});

app.register(fastifyMultipart);

app.register(crud, { prefix: "/crud" });

app.register(auth, { prefix: "/auth" });

app.register(socket, { prefix: "/friends" });

app.setErrorHandler(errorHandler);

const start = async () => {
	try {
		await app.listen({ port: 3000, host: "0.0.0.0" });
		console.log("Server is running on ", process.env.API_USER);
	} catch (err) {
		app.log.error(err);
		console.log(err);
		process.exit(1);
	}
};

start();
