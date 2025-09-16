export enum LobbyClientEvent {
  ERROR = "ERROR",
  JOINED = "JOINED",
  LEFT = "LEFT",
  KICKED = "KICKED",
  LOBBY_LIST = "LOBBY_LIST",
  CREATE_LOBBY = "CREATE_LOBBY",
  UPDATE_LOBBY = "UPDATE_LOBBY",
  DELETE_LOBBY = "DELETE_LOBBY",
  TRANSFER_OWNER = "TRANSFER_OWNER",
  GAME_CREATED = "GAME_CREATED",
  GAME_RESULT = "GAME_RESULT",
  TOURNAMENT_WON = "TOURNAMENT_WON",
  WAITING_OPPONENTS = "WAITING_OPPONENTS",
}

export enum LobbyServerEvent {
  CREATE = "CREATE",
  ACTION = "ACTION",
}

export enum Action {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  LAUNCH = "LAUNCH",
  KICK = "KICK",
  SWITCH_READY = "SWITCH_READY",
}

export enum SocketLobbyState {
  USER_STATE = "USER_STATE",
  LOBBIES_STATE = "LOBBIES_STATE",
  GAME_URL_STATE = "GAME_URL_STATE",
  CURRENT_LOBBY_ID_STATE = "CURRENT_LOBBY_ID_STATE",
  NEXT_OPPONENTS_STATE = "NEXT_OPPONENTS_STATE",
  TOURNAMENT_WON_STATE = "TOURNAMENT_WON_STATE",
  MATCH_STATE = "MATCH_STATE",
}

export type LobbyPlayer = {
  id: number;
  name: string;
  avatar: string;
  updated_at: string;
};

export type Lobby = {
  id: number;
  name: string;
  player_limit: number;
  score_max: number;
  is_tournament: boolean;
  players: LobbyPlayer[];
  ready_ids: number[];
  joinable: boolean;
};

export type LobbyCreate = {
  name: string;
  player_limit: number;
  score_max: number;
  is_tournament: boolean;
};

export type LobbyPlayerAction = {
  target_id: number;
  player_id?: number;
  action: Action;
};
