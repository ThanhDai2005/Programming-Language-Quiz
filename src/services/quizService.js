import { post } from "../utils/request";

export const createAnswers = async (options) => {
  const result = await post("answers", options);
  return result;
};
