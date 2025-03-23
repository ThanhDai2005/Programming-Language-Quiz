import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const getToken = localStorage.getItem("token");

  return (
    <>
      {getToken ? (
        <>
          <div className="main__login">
            <div className="main__title">
              Chúc mừng bạn đã đăng nhập thành công!
            </div>
            <Link to="/topic">Danh sách chủ đề ôn luyện</Link>
            <Link to="/answers">Danh sách bài đã luyện tập</Link>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="main__information">
        Website trắc nghiệm online lập trình Frontend là một nền tảng trực tuyến
        cho phép các lập trình viên Frontend thực hiện các bài kiểm tra, trắc
        nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập trình
        Frontend
      </div>
      <div className="main__information">
        Đối với các lập trình viên Frontend, website trắc nghiệm online cung cấp
        các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình trong
        các công nghệ và công cụ lập trình như HTML, CSS, JavaScript, jQuery,
        Bootstrap, Angular, React, Vue,...
      </div>
    </>
  );
}

export default Home;
