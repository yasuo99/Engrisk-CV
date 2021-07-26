import { Field, ErrorMessage, FieldArray } from "formik";
import React from "react";
import ThumbAudio from "./ThumbAudio";
import ThumbImage from "./ThumbImage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ToeicQuestionCreate = ({ values, setFieldValue, checkAnswer }) => {
  return (
    <div className="container border">
      <div className="question text-dark">
        Thuộc part  
        <select
          onChange={(e) => (values.toeic = Number.parseInt(e.target.value))} className='ml-1 pagination-select'
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
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
        </div>
        <div className="border border-primary rounded p-2 mt-2">
          <h6>Nội dung</h6>
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
                      "Save",
                      "NewPage",
                      "DocProps",
                      "Preview",
                      "Print",
                      "-",
                      "Templates",
                    ],
                  },
                  {
                    name: "clipboard",
                    items: [
                      "Cut",
                      "Copy",
                      "Paste",
                      "PasteText",
                      "PasteFromWord",
                      "-",
                      "Undo",
                      "Redo",
                    ],
                  },
                  {
                    name: "editing",
                    items: [
                      "Find",
                      "Replace",
                      "-",
                      "SelectAll",
                      "-",
                      "SpellChecker",
                      "Scayt",
                    ],
                  },
                  {
                    name: "forms",
                    items: [
                      "Form",
                      "Checkbox",
                      "Radio",
                      "TextField",
                      "Textarea",
                      "Select",
                      "Button",
                      "ImageButton",
                      "HiddenField",
                    ],
                  },
                  "/",
                  {
                    name: "basicstyles",
                    items: [
                      "Bold",
                      "Italic",
                      "Underline",
                      "Strike",
                      "Subscript",
                      "Superscript",
                      "-",
                      "RemoveFormat",
                    ],
                  },
                  {
                    name: "paragraph",
                    items: [
                      "NumberedList",
                      "BulletedList",
                      "-",
                      "Outdent",
                      "Indent",
                      "-",
                      "Blockquote",
                      "CreateDiv",
                      "-",
                      "JustifyLeft",
                      "JustifyCenter",
                      "JustifyRight",
                      "JustifyBlock",
                      "-",
                      "BidiLtr",
                      "BidiRtl",
                    ],
                  },
                  { name: "links", items: ["Link", "Unlink", "Anchor"] },
                  {
                    name: "insert",
                    items: [
                      "Image",
                      "Flash",
                      "Table",
                      "HorizontalRule",
                      "Smiley",
                      "SpecialChar",
                      "PageBreak",
                      "Iframe",
                    ],
                  },
                  "/",
                  {
                    name: "styles",
                    items: ["Styles", "Format", "Font", "FontSize"],
                  },
                  { name: "colors", items: ["TextColor", "BGColor"] },
                  {
                    name: "tools",
                    items: ["Maximize", "ShowBlocks", "-", "About"],
                  },
                ],
              },
              placeholder: "Nhập nội dung của câu hỏi ví dụ: We are Engrisk...",
            }}
            editor={ClassicEditor}
            data={values.content || ""}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue("content", data);
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
        </div>

        <div className="border border-secondary rounded p-2 mt-2">
          <h6>File</h6>
          <div className="row">
            <div className="col-6">
              <div className="boxImg">
                <ThumbImage file={values.file || values.image} />
                <div className="itemImg">
                  <Field
                    type="file"
                    accept="image/*"
                    className="item-question fa fa-camera "
                    id="image"
                    name="image"
                    value={""}
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  <img
                    src="/image/delete1.png"
                    className="img-question"
                    onClick={() => {
                      setFieldValue("file", null);
                    }}
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="boxImg">
                <ThumbAudio file={values.audio} />
                <div className="itemImg">
                  <Field
                    type="file"
                    accept="audio/*"
                    className="item-question fa fa-camera "
                    id="audio"
                    name="audio"
                    value={""}
                    onChange={(event) => {
                      setFieldValue("audio", event.currentTarget.files[0]);
                    }}
                  />
                  <img
                    src="/image/delete1.png"
                    className="img-question"
                    onClick={() => {
                      setFieldValue("audio", null);
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <img src="/image/picture (1).png" alt="img-question" class="img-question"> */}
        <div className="answer answerText border border-primary rounded p-2 mt-2">
          <h6>Đáp án (*)</h6>
          <ol type="A">
            <FieldArray name="answers">
              {({ insert, remove, push }) => (
                <div>
                  {values.answers.length > 0 &&
                    values.answers.map((answer, index) => {
                      return (
                        <div
                          className="d-flex justify-content-center"
                          key={index}
                        >
                          <div className="itemAnswer answer-card">
                            <div className="row">
                              <div className="col-1 d-flex justify-content-center">
                                <li className="textOrder"></li>
                              </div>
                              <div className="col-9">
                                <Field
                                  name={`answers.${index}.content`}
                                  placeholder="Nhập đáp án..."
                                  type="text"
                                  className={
                                    "answerFile"
                                   
                                  }
                                  id={`content${index}`}
                                  required
                                />

                                <ErrorMessage
                                  name={`answers.${index}.required`}
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
                      );
                    })}
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary rounded mt-2"
                      onClick={() =>
                        push({
                          content: "",
                          isQuestionAnswer: false,
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
    </div>
  );
};
export default ToeicQuestionCreate;