import { Upload } from "antd";
import UploadIcon from "../../assets/FileUpload.png";
import AWS from "aws-sdk";
import "./index.css";
import "../../index.css";
import Divider from "../Divider";
import { useDispatch } from "react-redux";
import { ADD_RESPONSE } from "../../redux/actions/formActions";
import uuid from "react-uuid";

const { Dragger } = Upload;

const config = new AWS.Config({
  // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

function FileInput({ question }) {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.userReducer.currentUser);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">{question.question_note}</div>
      <div className="upload-file-container-inner">
        <Dragger
          accept="file"
          multiple
          style={{ borderRadius: 10 }}
          customRequest={({ file, onError, onProgress, onSuccess }) => {
            AWS.config.update(config);
            const S3 = new AWS.S3({});
            console.log("DEBUG filename: ", file.name);
            console.log("DEBUG file type ", file.type);
            const objParams = {
              Bucket: process.env.REACT_APP_S3_BUCKET,
              // TODO: Eventually change object key to question number + random generated ID/number
              // need to save the randomly generated ID/number so it can also be retrieved
              Key: `fileInput/${question.question_id}/${file.name}`,
              Body: file,
              ContentType: file.type,
            };
            // TODO: Need to change where it only uploads to bucket upon form submission
            S3.putObject(objParams)
              .on("httpUploadProgress", function ({ loaded, total }) {
                onProgress(
                  {
                    percent: Math.round((loaded / total) * 100),
                  },
                  file
                );
              })
              .send(function (err, data) {
                if (err) {
                  onError();
                  console.log("Issue in S3.putObject.send()");
                  console.log(`Error Code: ${err.code}`);
                  console.log(`Error Message: ${err.message}`);
                } else {
                  onSuccess(data.response, file);
                  console.log("Send completed in S3.putObject.send()");
                  dispatch({
                    type: ADD_RESPONSE,
                    payload: {
                      id: uuid(),
                      response: objParams.Key,
                      question: question,
                    },
                  });
                  // const draftObj = {
                  //   draft_id: question.question_id + "_" + currentUser.user_id,
                  //   fk_user_id: currentUser.user_id,
                  //   fk_form_id: question.fk_form_id,
                  //   fk_question_id: question.question_id,
                  //   answer: objParams.Key,
                  // }
                  // dispatch({
                  //   type: ADD_DRAFT,
                  //   payload: draftObj,
                  // })
                }
              });
          }}
        >
          <img className="upload-icon" src={UploadIcon} alt="Upload File" />
          <p className="upload-text">Drag and Drop Files</p>
        </Dragger>
      </div>
      <Divider />
    </div>
  );
}

export default FileInput;
