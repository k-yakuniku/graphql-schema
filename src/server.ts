import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import "dotenv/config";
import { schema } from "./database/graphql/schema";
import { typeDefs, resolvers } from "./database/graphql/schemaSDL";

const PORT = Number(process.env.PUBLIC_PORT);
const ORIGIN_URL = process.env.PUBLIC_ORIGIN_URL;
const AccessControlAllowHeaders = [
  "X-CSRF-Token",
  "X-Requested-With",
  "Accept",
  "Accept-Version",
  "Content-Length",
  "Content-MD5",
  "Content-Type",
  "Date",
  "X-Api-Version",
  "Authorization",
];
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server
    .start()
    .then(() => console.log("ApolloServerStart"))
    .catch((e) => console.log(e));
  app.use(
    express.urlencoded({ extended: true }),
    express.json(),
    cors({
      origin: ORIGIN_URL,
      allowedHeaders: AccessControlAllowHeaders,
      exposedHeaders: AccessControlAllowHeaders,
    }),
    expressMiddleware(server)
  );
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
})();
