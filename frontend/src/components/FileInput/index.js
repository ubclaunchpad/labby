import { Upload } from "antd";
import UploadIcon from "../../assets/FileUpload.png";
import AWS from "aws-sdk";
import "./index.css";
import "../../index.css";
import Divider from "../Divider";

const { Dragger } = Upload;

const config = new AWS.Config({
  // Deprecated method of passing accessKeyId and secretAccessKey -- could not get new method to work
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

function FileInput({ question }) {
  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      <div className="upload-file-container-inner">
        <Dragger
          multiple
          style={{ borderRadius: 10 }}
          customRequest={({ file, onError, onProgress, onSuccess }) => {
            AWS.config.update(config);
            const S3 = new AWS.S3({});
            console.log("DEBUG filename: ", file.name);
            console.log("DEBUG file type ", file.type);
            const objParams = {
              Bucket: "labby-app",
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
                }
              });
          }}
        >
          <img className="upload-icon" src={UploadIcon} alt="Upload File" />
          <p className="upload-text">
            Drag and Drop Files
          </p>
        </Dragger>
      </div>
      <Divider />
    </div>
  );
}

export default FileInput;
