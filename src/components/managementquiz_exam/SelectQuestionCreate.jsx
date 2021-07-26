import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Field, ErrorMessage, FieldArray } from "formik";
const SelectQuestionCreate = ({ values, setFieldValue, checkAnswer }) => {
  return (
    <div>
      <div className="container border">
        <div className="question">
          <div className="boxQuestion">
            <div className="border border-primary rounded p-2">
              <h6>Câu hỏi (*)</h6>
              <CKEditor
                config={{
                  ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command
                    // You have to change this address to your server that has the ckfinder php connector
                    toolbar: [
                      {
                        name: "document",
                        items: [
                          "Source",
                          "-",
                          "NewPage",
                          "Preview",
                          "-",
                          "Templates",
                        ],
                      }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
                      [
                        "Cut",
                        "Copy",
                        "Paste",
                        "PasteText",
                        "PasteFromWord",
                        "-",
                        "Undo",
                        "Redo",
                      ], // Defines toolbar group without name.
                      "/", // Line break - next group will be placed in new line.
                      { name: "basicstyles", items: ["Bold", "Italic"] },
                    ],
                  },
                  placeholder:
                    "Nhập câu hỏi ví dụ: Điền vào chỗ trống/ Chọn đáp án đúng...",
                }}
                editor={ClassicEditor}
                data={values.preQuestion || ""}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("preQuestion", data);
                }}
                event={(editor) => {
                  editor.on("fileUploadResponse", (data) => {
                    console.log(data);
                  });
                }}
                onUpload={(event, edito) => {
                  console.log(event);
                }}
              />
              <br className="mt-2"></br>
              <label>Nội dung</label>
              <Field type='text' name="content">

              </Field>
            </div>
          </div>
          <div className="border border-primary rounded p-2 mt-1">
            <h6>Đáp án (*)</h6>
            <div className="answer answerText">
              <ol type="A">
                <FieldArray name="answers">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.answers.length > 0 &&
                        values.answers.map((answer, index) => (
                          <div
                            className="d-flex justify-content-center"
                            key={index}
                          >
                            <div className="itemAnswer answer-card">
                              <div className="row">
                                <div className="col-1 d-flex justify-content-center">
                                  <p className="textOrder">
                                    <li></li>
                                  </p>
                                </div>
                                <div className="col-9">
                                  <Field
                                    name={`answers.${index}.content`}
                                    placeholder="Nhập đáp án..."
                                    type="text"
                                    className="answerFile"
                                    id="content"
                                    required
                                  />
                                  <ErrorMessage
                                    name={`answers.${index}.name`}
                                    component="div"
                                    className="field-error"
                                  />
                                </div>
                                <div className="col-1">
                                  <Field
                                    name={`answers.${index}.isQuestionAnswer`}
                                    className="radioAnswerFile"
                                    type="checkbox"
                                    id="isQuestionAnswer"
                                    data-id={index}
                                    onClick={(e) => checkAnswer(e, values)}
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
                                  >
                                    <img src="/image/cross.png"></img>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-addAnswer fa fa-plus"
                        onClick={() =>
                          push({
                            content: "",
                            isQuestionAnswer: false,
                            image: null,
                            isAudioAnswer: false,
                          })
                        }
                      >
                        Thêm đáp án
                      </button>
                    </div>
                  )}
                </FieldArray>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectQuestionCreate;
