import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicsService";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchAPI = async () => {
      const answerByUserId = await getAnswersByUserId(userId);
      const topics = await getListTopic();

      let result = [];

      for (let i = 0; i < answerByUserId.length; i++) {
        result.push({
          ...topics.find((item) => item.id == answerByUserId[i].topicId),
          ...answerByUserId[i],
        });
      }

      setDataAnswers(result.reverse());
    };
    fetchAPI();
  }, []);

  console.log(dataAnswers);

  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataAnswers.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/result/` + item.id}>Xem chi tiết</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Answers;
