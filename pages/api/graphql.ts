import { ApolloServer, gql } from "apollo-server-micro";
import { Photon } from "@generated/photon";
import { getUserId, signup, login } from "./util";
const photon = new Photon();

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
      return photon.users.findMany({});
    },
    records(parent, args, context) {
      return photon.records.findMany({});
    },
    me(parent, args, context) {
      const id = getUserId(context);
      return photon.users.findOne({ where: { id } });
    }
  },
  Mutation: {
    signup,
    login,
    createRecord(parent, args, context) {
      return photon.records.create({
        data: { title: args.title, description: args.description }
      });
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => ({
    ...request,
    photon
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
