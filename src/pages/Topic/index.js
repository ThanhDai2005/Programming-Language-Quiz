import { useEffect, useState } from "react";
import "./Topic.scss";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicsService";

function Topic() {
  const [topics, setTopics] = useState([]);

  const fetchAPI = async () => {
    const respone = await getListTopic();
    setTopics(respone);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h2>Danh sách chủ để ôn luyện</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {topics.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={"/quiz/" + item.id}>Làm bài</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Topic;
