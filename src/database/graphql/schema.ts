import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../postgres/models/Users/controller";

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLScalarType,
  Kind,
  GraphQLInputObjectType,
} from "graphql";

// 新しいスカラータイプを定義
const DateType = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: any) {
    return new Date(value); // value from the client
  },
  serialize(value: any) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(+ast.value); // ast value is always in string format
    }
    return null;
  },
});
// UsersType定義
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    introduction: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    CreatedAt: { type: DateType },
    UpdatedAt: { type: DateType },
  },
});
// UsersInputType定義
const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: GraphQLString },
    introduction: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

// QueryType定義
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: new GraphQLList(UserType), // []配列として返す
      resolve: async () => {
        const users = await getUsers();
        return users;
      },
    },
  },
});
// MutationType定義
const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    create: {
      type: UserType,
      //   args: {
      //     email: { type: GraphQLString },
      //     password: { type: GraphQLString },
      //   },
      // userInput: { email, pass },となるので注意
      args: { userInput: { type: UserInputType } },
      resolve: async (parent, args, context, info) => {
        const newUser = await createUser(args.userInput);
        return newUser;
      },
    },
    update: {
      type: GraphQLInt,
      args: {
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        introduction: { type: GraphQLString },
      },
      resolve: async (parent, args, context, info) => {
        const updateCount = await updateUser(args);
        return updateCount;
      },
    },
    delete: {
      type: GraphQLInt,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, context, info) => {
        const deleteCount = await deleteUser(args);
        return deleteCount;
      },
    },
  },
});
// schema定義
export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
