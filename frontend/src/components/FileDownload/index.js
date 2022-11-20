import "./index.css";
import DownloadIcon from "../../assets/FileDownload.png";
import AWS from "aws-sdk";
import "./index.css";
import "../../index.css";
import Divider from "../Divider";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});

function FileDownload({ question }) {
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const optionList = answerList[question.question_id ?? ""] ?? [];
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      {options.map((option) => (
        <div
          className="download-file-container-customer"
          key={option.answer_id}
          onClick={() => {
            AWS.config.update(config);
            const S3 = new AWS.S3({});
            const objParams = {
              Bucket: "labby-app",
              Key: `fileDownload/${option.answer}`,
            };
            S3.getObject(objParams, function (err, data) {
              if (err) {
                console.log("Issue in S3.getObject()");
                console.log(`Error Code: ${err.code}`);
                console.log(`Error Message: ${err.message}`);
              } else {
                console.log("Download completed in S3.getObject()");
                const url = window.URL.createObjectURL(new Blob([data.Body]));
                const link = document.createElement("a");
                link.href = url;
                link.download = option.answer.split("_")[1];
                link.click();
              }
            });
          }}
        >
          <img
            className="download-icon-customer"
            src={DownloadIcon}
            alt="Download File"
          />
          <p className="download-text-customer">Download {option.answer.split("_")[1]}</p>
        </div>
      ))}
      <Divider />
    </div>
  );
}

export default FileDownload;
