import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestions } from "../../services/questionsService";
import "./Result.scss";
import { getTopic } from "../../services/topicsService";

function Result() {
  const params = useParams();
  const navigate = useNavigate();
  const [dataResult, setDataResult] = useState([]);
  const [dataTopic, setDataTopic] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getListQuestions(dataAnswers.topicId);
      const nameTopic = await getTopic(dataAnswers.topicId);
      console.log(nameTopic);
      console.log(dataAnswers.answers);
      console.log(dataQuestions);

      let resultFinal = [];

      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            (item) => item.questionId == dataQuestions[i].id
          ),
        });
      }

      setDataResult(resultFinal);
      setDataTopic(nameTopic);

      console.log(resultFinal);
    };
    fetchAPI();
  }, []);

  let count = 0;
  for (let i = 0; i < dataResult.length; i++) {
    if (dataResult[i].answer == dataResult[i].correctAnswer) {
      count++;
    }
  }

  const handleSubmit = () => {
    navigate(`/quiz/${dataTopic.id}`);
  };

  return (
    <>
      <h2>Kết quả chủ đề: {dataTopic.name}</h2>
      <div className="result__percent">
        Đúng: <span>{count}</span> | Sai:{" "}
        <span>{dataResult.length - count}</span> | Tổng số câu:{" "}
        <span>{dataResult.length}</span> | Tỷ lệ đúng:{" "}
        <span>{(count / dataResult.length) * 100}%</span>
      </div>
      <div className="result__list">
        <form onSubmit={handleSubmit}>
          {dataResult.map((item) => (
            <div className="result__item" key={item.id}>
              <p>
                Câu {item.id}: {item.question}
                {item.answer == item.correctAnswer ? (
                  <span className="result__tag result__tag--true">Đúng</span>
                ) : (
                  <span className="result__tag result__tag--false">Sai</span>
                )}
              </p>
              {item.answers.map((itemAnswer, indexAnswer) => {
                let checked = false;
                let className = "";

                if (item.answer == indexAnswer) {
                  checked = true;
                  className = "result__item--selected";
                }
                if (item.correctAnswer == indexAnswer) {
                  className += " result__item--result";
                }

                return (
                  <div className="result__answer" key={indexAnswer}>
                    <input type="radio" checked={checked} disabled />
                    <label className={className}>{itemAnswer}</label>
                  </div>
                );
              })}
            </div>
          ))}
          <button type="submit">Làm lại</button>
        </form>
      </div>
    </>
  );
}

export default Result;
