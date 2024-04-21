import UserModel from "./model";

interface InputUserAges {
  email?: string;
  password?: string;
  name?: string;
  introduction?: string;
}
async function getUsers() {
  const users = await UserModel.findAll();
  return users;
}
async function createUser(user: InputUserAges) {
  const newUser = await UserModel.create({ ...user });
  return newUser;
}
async function updateUser(user: InputUserAges) {
  const updatecount = await UserModel.update(
    { ...user },
    { where: { email: user.email } }
  );
  return updatecount[0];
}
async function deleteUser(user: InputUserAges) {
  const deleteCount = await UserModel.destroy({
    where: { email: user.email, password: user.password },
  });
  return deleteCount;
}
export { getUsers, createUser, updateUser, deleteUser, InputUserAges };
