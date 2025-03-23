import { get, post } from "../utils/request";

export const createRegister = async (options) => {
  const result = await post("users", options);
  return result;
};

export const getLogin = async () => {
  const result = await get("users");
  return result;
};
