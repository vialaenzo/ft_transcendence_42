export type TournamentPlayer = {
	id: number;
	currentDepth: number;
	matchCount: number;
} | null;

export type Tournament = {
	id: number;
	lobbyId: number;
	scoreMax: number;
	players: TournamentPlayer[];
};

export type TournamentCreate = {
	user_ids: number[];
};

export type MatchQuery = {
	score_max: number;
	players: { create: { player_id: number }[] };
};

export type RoundQuery = {
	matches: { create: MatchQuery[] };
	depth: number;
};

export type TournamentQuery = {
	rounds: { create: RoundQuery[] };
};
