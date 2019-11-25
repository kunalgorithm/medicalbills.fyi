import { ApolloServer, gql } from "apollo-server-micro";

import { getUserId, signup, login } from "./util";
import { Prisma } from "../../prisma/generated/prisma-client";
const { Client } = require("pg");
const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const prisma: Prisma = new Prisma();
export const typeDefs = gql`
  type Query {
    users: [User!]!
    records: [Record!]!
    me: User
  }
  type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createRecord(title: String!, description: String!): Record!
  }
  type User {
    firstName: String
    lastName: String
    email: String
  }
  type Record {
    id: String
    title: String
    description: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [];
    },
    records: async function records(parent, args, context) {
      try {
        await context.pg.connect();
        const res = await context.pg.query(`SELECT * from records LIMIT 100;`);
        // console.log(res);
        return res.rows;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    me(parent, args, context) {
      const id = getUserId(context);
      return prisma.user({ id });
    }
  },
  Mutation: {
    signup,
    login,
    createRecord(parent, args, context) {
      return prisma.createRecord({
        title: args.title,
        description: args.description
      });
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,
    prisma,
    pg
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
