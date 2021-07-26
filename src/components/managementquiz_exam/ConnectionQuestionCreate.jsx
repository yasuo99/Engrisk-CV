import { Field, ErrorMessage, FieldArray } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ConnectionQuestionCreate = ({ values, setFieldValue }) => {
  return (
    <div className="container border">
      <div className="question">
        <label>Câu hỏi</label>
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
            // setFieldValue("preQuestion", data);
            values.preQuestion = data;
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
        <div className="answerSort mt-1">
          <h5>ĐÁP ÁN:</h5>

          <div className="answer answerText">
            <ol type="1">
              <FieldArray name="answers">
                {({ insert, remove, push }) => (
                  <div className="container">
                    {values.answers.length > 0 &&
                      values.answers.map((answer, index) => (
                        <div
                          className="d-flex justify-content-between mt-2"
                          key={index}
                        >
                          <div className="itemAnswer item-answer-align mr-1">
                            <div className="row">
                              <div className="col-1">
                                <p className="textOrder mr-2">{index}.</p>
                              </div>
                              <div className="col-9">
                                <Field
                                  name={`answers.${index}.contentLeft`}
                                  placeholder="Nhập đáp án..."
                                  type="text"
                                  className="answerFile"
                                  id="textAnswerLeft"
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
                          <div className="itemAnswer item-answer-align ml-1">
                            <div className="row">
                              <div className="col-1">
                                <p className="textOrder">{index}.</p>
                              </div>
                              <div className="col-9">
                                <Field
                                  name={`answers.${index}.contentRight`}
                                  placeholder="Nhập đáp án..."
                                  type="text"
                                  className="answerFile"
                                  id="textAnswerRight"
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
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary rounded mt-2"
                        onClick={() =>
                          push({
                            content: "",
                            isQuestionAnswer: "",
                            contentRight: "",
                            contentLeft: "",
                            image: null,
                            isAudioAnswer: false,
                          })
                        }
                      >
                        Thêm đáp án <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </ol>
          </div>
        </div>
        {/* <button class="btn btn-addAnswer"><img src="/image/plus (3).png"> Thêm đáp án</button> */}
      </div>
    </div>
  );
};
export default ConnectionQuestionCreate;
