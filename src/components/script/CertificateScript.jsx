import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "../search/Search";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import examApiv2 from "./../../api/2.0/examApi";
import { ScriptTypes } from "./../../constants/ScriptTypes";
import certificateApi from "../../api/2.0/certificateApi";
import { Tabs, Tab } from "react-bootstrap";
const CertificateScript = ({ script, setCertificate }) => {
  const [selectedExam, setSelectedExam] = useState(script?.miniExam?.id || "");
  const [selectedCertificate, setSelectedCeritifcate] = useState(
    script?.certificate?.id || ""
  );
  const [options, setOptions] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [tempCertificate,setTempCertificate] = useState({})
  const [examQuery, setExamQuery] = useState("");
  const [certificateQuery, setCertifcateQuery] = useState("");
  async function fetchExam() {
    const params = {
      purpose: "Test",
      search: examQuery,
    };
    const exams = await examApiv2.getManage(params);
    setOptions(exams);
  }
  async function fetchCertificate() {
    const params = {
      search: certificateQuery,
    };
    const certificates = await certificateApi.getManage(params);
    if (script?.certificate) {
      const data = [script.certificate, ...certificates];
      setCertificates(data);
    } else {
      setCertificates(certificates);
    }
  }
  useEffect(() => {
    fetchCertificate();
    fetchExam();
    if(script?.certificate){
      setTempCertificate(script.certificate)
    }
  }, [script]);
  useEffect(() => {
    setCertificate({
      id: script?.id || "00000000-0000-0000-0000-000000000000",
      exam: selectedExam || "00000000-0000-0000-0000-000000000000",
      certificateId:
        selectedCertificate || "00000000-0000-0000-0000-000000000000",
      type: ScriptTypes.CERTIFICATE,
    });
  }, [selectedExam, selectedCertificate]);
  return (
    <Tabs
      defaultActiveKey="exam"
      id="controlled-tab-example"
      mountOnEnter={true}
    >
      <Tab eventKey="exam" title="Bài thi" tabClassName="font-weight-bold">
        <br></br>
        <h6>
          Lựa chọn bài thi <span className="text-danger">*</span>
        </h6>
        <br></br>
        <select
          name="exam"
          id="exam"
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
      </Tab>
      <Tab
        eventKey="certificate"
        title="Chứng chỉ"
        tabClassName="font-weight-bold"
      >
        <Row>
          <Col sm='6'>
          <br></br>
          <h6>
            Lựa chọn chứng chỉ <span className="text-danger">*</span>
          </h6>
          <br></br>
          {certificates.map((certificate, index) => (
            <div key={index}>
              <input
                type="radio"
                name="certificate"
                value={certificate.id}
                onChange={(e) => {setSelectedCeritifcate(e.target.value), setTempCertificate(certificate)}}
                checked={selectedCertificate == certificate.id}
              ></input>
              <span className="text-dark"> {certificate.title}</span>
            </div>
          ))}
          </Col>
         <Col sm='6' className='script-panel'>
           <br></br>
           <h6>Mẫu chứng chỉ</h6>
           <br></br>
           {Object.keys(tempCertificate).length > 0 &&  <img className='img-fluid' src={tempCertificate.template}></img>}
          
         </Col>
        </Row>
      </Tab>
    </Tabs>
  );
};
export default CertificateScript;
