import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quiz.scss";
import { getTopic } from "../../services/topicsService";
import { getListQuestions } from "../../services/questionsService";
import { createAnswers } from "../../services/quizService";

function Quiz() {
  const params = useParams();
  const [title, setTitle] = useState({});
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await getTopic(params.id);
      setTitle(respone);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await getListQuestions(params.id);
      setQuestion(respone);
    };
    fetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedAnswers = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
    }

    const options = {
      userId: parseInt(localStorage.getItem("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };

    const respone = await createAnswers(options);
    if (respone) {
      navigate(`/result/${respone.id}`);
    }

    console.log(respone);
  };

  return (
    <>
      <h2>Bài Quiz chủ đề: {title.name}</h2>
      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {question.map((item) => (
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {item.id}: {item.question}
              </p>
              {item.answers.map((itemAnswer, indexAnswer) => (
                <div className="form-quiz__answer" key={indexAnswer}>
                  <input
                    type="radio"
                    name={item.id}
                    id={itemAnswer}
                    value={indexAnswer}
                    required
                  />
                  <label htmlFor={itemAnswer}>{itemAnswer}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Nộp bài</button>
        </form>
      </div>
    </>
  );
}

export default Quiz;
