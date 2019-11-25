import { ApolloServer, gql } from "apollo-server-micro";

import { getUserId, signup, login } from "./util";
import { Prisma } from "../../prisma/generated/prisma-client";
const data = require("../../MEDICARE_CHARGE_INPATIENT_DRGALL_DRG_Summary_FY2017/state_data.json");

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
      // data.forEach(async rec => {
      //   await prisma.createRecord({
      //     title: rec.procedure,
      //     state: rec.state,
      //     totalDischarges: rec.total_discharges,
      //     averageCoveredCharges: rec.avg_covered_charges,
      //     averageTotalPayments: rec.avg_total_payments,
      //     averageMedicarePayments: rec.avg_medicare_payments
      //   });
      // });
      return [];
    },
    records(parent, args, context) {
      return prisma.records({});
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
    prisma
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
