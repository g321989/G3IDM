import dotenv from "dotenv";
dotenv.config();

let config = {};

config.api_url = `${process.env.REACT_APP_API_PROTOCAL}${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_BASE_URL}`;
config.graphql_url = `${process.env.REACT_APP_GRAPHQL_PROTOCAL}${process.env.REACT_APP_GRAPHQL_HOST}${process.env.REACT_APP_GRAPHQL_PORT}${process.env.REACT_APP_GRAPHQL_BASE_URL}`;
config.graphql_web_socket_url = `${process.env.REACT_APP_GRAPHQL_WEB_SOCKET_PROTOCAL}${process.env.REACT_APP_GRAPHQL_WEB_SOCKET_HOST}${process.env.REACT_APP_GRAPHQL_WEB_SOCKET_PORT}${process.env.REACT_APP_GRAPHQL_WEB_SOCKET_BASE_URL}`;
config.keylock_url = `${process.env.REACT_APP_KEY_CLOCK_API}`;
export { config };
