import { ApolloServer, gql } from "apollo-server-micro";

import { getUserId } from "./util";

process.env.NODE_ENV === "development" && require("dotenv").config();

const { Client } = require("pg");
const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
pg.connect();

export const typeDefs = gql`
  type Query {
    users: [User!]!
    records(search: String): [Record!]!
    me: User
  }
  type Mutation {
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
    state: String
    total_discharges: Int
    avg_covered_charges: Float
    avg_total_payments: Float
    avg_medicare_payments: Float
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
      let res = { rows: [] };
      try {
        if (args.search) {
          console.log(`🏹 records search='${args.search}' `);
          res = await context.pg.query(
            `SELECT * from records WHERE title ILIKE '%${args.search}%' LIMIT 100;`
          );
        } else {
          res = await context.pg.query(`SELECT * from records LIMIT 100;`);
        }
      } catch (error) {
        console.log(error);
      }
      return res.rows;
    },
    me(parent, args, context) {
      const id = getUserId(context);
      return {};
    }
  },
  Mutation: {
    createRecord(parent, args, context) {
      const res = context.pg.query(`INSERT INTO records ...`); //tODO
      return { title: args.title, description: args.description };
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,

    pg
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
