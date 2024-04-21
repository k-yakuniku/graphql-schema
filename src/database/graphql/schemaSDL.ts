import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  InputUserAges,
} from "../postgres/models/Users/controller";

// 第一引数が親オブジェクト（この場合は無視されます）で、
// 第二引数がGraphQLから渡される引数のオブジェクト
// (_: any, user: InputUserAges)
// _: any => 特定のリゾルバでは使用されないので、この引数を無視して使用する

export const typeDefs = `#graphql

# GraphQL default Scalar値
# Int, Float, String, Boolean, ID
scalar Date # Custom Scalar

type User {
    id: ID!
    name: String
    introduction: String
    email: String!
    password: String!
    createdAt: Date!
    updatedAt: Date!
}
type Query {
    users: [User!]
}
type Mutation {
  # String! としても ""空は通る。空の文字列として登録される
    create(email: String!, password: String!): User
    update(email: String!, name: String, introduction: String): Int
    delete(email: String!, password: String!): Int
}
`;
export const resolvers = {
  Query: {
    users: async () => {
      const users = await getUsers();
      return users;
    },
  },
  Mutation: {
    create: async (_: any, user: InputUserAges) => {
      const newUser = await createUser(user);
      return newUser;
    },
    update: async (_: any, user: InputUserAges) => {
      const updateCount = await updateUser(user);
      return updateCount;
    },
    delete: async (_: any, user: InputUserAges) => {
      const deleteCount = await deleteUser(user);
      return deleteCount;
    },
  },
};
