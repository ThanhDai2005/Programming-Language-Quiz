import { get } from "../utils/request";

export const getListQuestions = async (id) => {
  const result = await get(`questions?topicId=${id}`);
  return result;
};
