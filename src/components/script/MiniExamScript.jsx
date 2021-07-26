import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "../search/Search";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import examApiv2 from "./../../api/2.0/examApi";
import { ScriptTypes } from "./../../constants/ScriptTypes";
const MiniExamScript = ({ script, setMiniExam }) => {
  const [selectedExam, setSelectedExam] = useState("");
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (script?.miniExam) {
      setSelectedExam(script?.miniExam.id);
    }
    async function fetchExam() {
      const exams = await examApiv2.getManage();
      setOptions(exams);
    }
    fetchExam();
  }, [script]);
  useEffect(() => {
    setMiniExam({
      id: script?.id || "00000000-0000-0000-0000-000000000000",
      exam: selectedExam || "00000000-0000-0000-0000-000000000000",
      type: ScriptTypes.MINIEXAM,
    });
  }, [selectedExam]);
  return (
    <Row>
      <Col sm={6} className="script-panel-sm" style={{ overflow: "auto" }}>
        <h6>Lựa chọn bài kiểm tra</h6>
        <br></br>
        <select
          name=""
          id=""
          className="pagination-select"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Trống</option>
          {options.map((exam, index) => (
            <option value={exam.id} key={index}>
              {exam.title}
            </option>
          ))}
        </select>
        {/* <Typeahead
          id="basic-example"
          labelKey="title"
          onChange={(e) => {
            setSelectedExam(e);
            if (e[0]) {
              setMiniExam({
                
              });
            } else {
              setMiniExam({
                id: script?.id || "00000000-0000-0000-0000-000000000000",
                miniExam: null,
                type: ScriptTypes.MINIEXAM,
              });
            }
          }}
          options={options}
          placeholder="Chọn bài kiểm tra"
          selected={selectedExam}
          className="rounded-0"
        /> */}
      </Col>
      <Col sm={6}></Col>
    </Row>
  );
};
export default MiniExamScript;
