import { AudioPlayer } from "../../components/utils/AudioPlayer";

const VocabularyPreview = ({ vocabulary }) => {
  return (
    <div className="container">
      <img
        className="img-fluid"
        src={
          vocabulary.wordImg ||
          "https://cdn.busuu.com/media/resized/entity/1440/company_1528111874_1440.jpg"
        }
      ></img>
      <h4 className="mt-1">
        {vocabulary.eng}
        <br></br>
      </h4>
      {vocabulary.wordVoice && (
        <div className="d-flex justify-content-center mt-2">
          <AudioPlayer src={vocabulary.wordVoice}></AudioPlayer>
        </div>
      )}
      <h4 className="">{vocabulary.vie}</h4>
      <hr className="d-flex justify-content-center w-75"></hr>
      <div className="mt-2 example">
        <h5>Ví dụ</h5>
        Vd1: ............................
        <img src="/image/sound.png" className="sound"></img>
        <br></br>
        Vd2: ............................
      </div>
    </div>
  );
};
export default VocabularyPreview;
