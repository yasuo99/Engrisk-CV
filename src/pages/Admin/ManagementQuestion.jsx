import React, { Component, useEffect, useState } from "react";
import SubMenu from "../../components/admin/SubMenu";
import QLListCauHoi from "../../components/managementquestions/QLListCauHoi";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import questionApiV2 from "../../api/2.0/questionApi";
import { QuestionTypes } from "../../constants/QuestionTypes";
import { Table } from "react-bootstrap";
import Paginate from "../../components/pagination/Paginate";
import parse from "html-react-parser";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { FaRedo, FaSave } from "react-icons/fa";
import Search from "../../components/search/Search";
import QuestionCreate from "../../components/question/QuestionCreate";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
import QuestionPreview from "../../components/question/QuestionPreview";
import ManagementQuestionComponent from "../../components/question/ManagementQuestionComponent";
const initial = {
  content: "",
  preQuestion: "",
  answers: [
    {
      content: "",
      contentLeft: "",
      contentRight: "",
      firstLine: "",
      secondLine: "",
      isQuestionAnswer: true,
    },
  ],
  file: null,
  audio: null,
  type: QuestionTypes.Basic,
  isMultipleAnswer: false,
  firstUser: "",
  secondUser: "",
};
const ManagementQuestion = ({}) => {

  async function fetchData(params,filter, query) {
    return await questionApiV2.getManage(params, filter, query);
  }
  return (
    <div>
      <div id="wrapper">
        <SubMenu></SubMenu>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <HeaderAdmin></HeaderAdmin>
            <ManagementQuestionComponent header={true} fetch={fetchData}></ManagementQuestionComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagementQuestion;
