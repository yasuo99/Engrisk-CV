import parse from "html-react-parser";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
const TheoryScreen = ({ theory, next, isFinish, sectionId, scriptId }) => {
  return (
    <div>
      <Jumbotron className="mt-4 card border-0 bg-light shadow-sm">
        <h1>Lý thuyết</h1>
        <div>{parse(theory)}</div>
        <p></p>
      </Jumbotron>
      <div className="container">
        <div className="drawer-content">
          <div className="page-wrap">
            {!isFinish ? (
              <button
                className="feedback-bar-btn"
                onClick={() => {
                  {
                    next();
                  }
                }}
              >
                Kế tiếp
              </button>
            ) : (
              <Link
                className="btn feedback-bar-btn"
                to={`/sections/${sectionId}/finish`}
              >
                Kết thúc
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TheoryScreen;
