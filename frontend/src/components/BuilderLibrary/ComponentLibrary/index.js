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

const DraggableCard = ({ children }) => {
  return (
    <DefaultCard>
      <div className="draggableCardContent">{children}</div>
    </DefaultCard>
  );
};

function ComponentLibrary() {
  return (
    <>
      <div className="elementContainer">
        <div className="elementsTitle">Question Elements</div>
        <DraggableCard>
          <UnorderedListOutlined /> Multiple choice
        </DraggableCard>
        <DraggableCard>
          <CheckCircleOutlined /> Single selection
        </DraggableCard>
        <DraggableCard>
          <FontSizeOutlined /> Text answer
        </DraggableCard>
        <DraggableCard>
          <DownSquareOutlined /> Dropdown
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Layout Elements</div>
        <DraggableCard>
          <BoldOutlined /> Heading
        </DraggableCard>
        <DraggableCard>
          <LineHeightOutlined /> Text line
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Media Elements</div>
        <DraggableCard>
          <CloudUploadOutlined /> File upload
        </DraggableCard>
        <DraggableCard>
          <DownloadOutlined /> File download
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Billing Elements</div>
        <DraggableCard>
          <AuditOutlined /> Contact information
        </DraggableCard>
      </div>
    </>
  );
}

export default ComponentLibrary;
