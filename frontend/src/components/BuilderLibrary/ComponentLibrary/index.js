import "./index.css";
import { DefaultCard } from "../../Card";
import {
  UnorderedListOutlined,
  DownloadOutlined,
  FontSizeOutlined,
  BoldOutlined,
  AuditOutlined,
  CloudUploadOutlined,
  DownSquareOutlined,
  CheckCircleOutlined,
  LineHeightOutlined,
} from "@ant-design/icons";

function ComponentLibrary() {
  return (
    <>
      <div className="elementContainer">
        <div className="elementsTitle">Question Elements</div>
        <DefaultCard>
          <UnorderedListOutlined /> Multiple choice
        </DefaultCard>
        <DefaultCard>
          <CheckCircleOutlined /> Single selection
        </DefaultCard>
        <DefaultCard>
          <FontSizeOutlined /> Text answer
        </DefaultCard>
        <DefaultCard>
          <DownSquareOutlined /> Dropdown
        </DefaultCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Layout Elements</div>
        <DefaultCard>
          <BoldOutlined /> Heading
        </DefaultCard>
        <DefaultCard>
          <LineHeightOutlined /> Text line
        </DefaultCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Media Elements</div>
        <DefaultCard>
          <CloudUploadOutlined /> File upload
        </DefaultCard>
        <DefaultCard>
          <DownloadOutlined /> File download
        </DefaultCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Billing Elements</div>
        <DefaultCard>
          <AuditOutlined /> Contact information
        </DefaultCard>
      </div>
    </>
  );
}

export default ComponentLibrary;
