import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts"; //Schema no longer in a gql folder
import { MongoClient } from "mongodb";
import { UserModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts"; // Resolvers now in a single resolvers.ts file

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("users");
const UsersCollection = mongoDB.collection<UserModel>("users");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ UsersCollection }),
});

console.info(`Server ready at ${url}`);