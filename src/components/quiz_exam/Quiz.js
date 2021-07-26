// import React, { Component } from "react";

import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  answers: [
    {
      textAnswer: '',
      radioAnswer: false,
    },
  ],
};

const Quiz = () => (
  <div className="col-md-6 kedoc">
    <div className="question">
      <textarea className="titleQuestion" placeholder="Nhập câu hỏi..." type="text" defaultValue={""} />
      {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
      <p>Chọn file nghe: <input type="file" className="file mt-3" /></p>
      <div className="answer answerText">
        <ol type="A">
          <Formik
            initialValues={initialValues}>
            {({ values }) => (
              <Form>
                <FieldArray name="answers">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.answers.length > 0 &&
                        values.answers.map((answer, index) => (
                          <div className="itemAnswer">
                          <div className="row" key={index}>
                            <div className="col-1">
                              <p htmlFor={`answers.${index}.name`} className="textOrder"><li></li></p>

                            </div>
                            <div className="col-9">
                              <Field
                                name={`answers.${index}.name`}
                                placeholder="Nhập đáp án..."
                                type="text"
                                className="answerFile"
                              />
                              <ErrorMessage
                                name={`answers.${index}.name`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col-1">

                              <Field
                                name={`answers.${index}.name`}
                                className="radioAnswerFile"
                                type="radio"
                              />
                              <ErrorMessage
                                name={`answers.${index}.name`}
                                component="div"
                                className="field-error"
                              />
                             
                            </div>
                            <div className="col-1">
                            <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                                className="exit"
                              ><img src="/image/cross.png"></img>
                              </button>
                              </div>
                            
                          </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-addAnswer"
                        onClick={() => push({ name: '', email: '' })}>
                        <img src="/image/plus.png" /> Thêm đáp án
                      </button>
                    </div>
                  )}
                </FieldArray>

              </Form>
            )}
          </Formik>
        </ol>
      </div>

    </div>
  </div>
);

export default Quiz;

