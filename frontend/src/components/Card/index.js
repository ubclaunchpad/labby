import React from "react";
import { Card } from "antd";
import "./index.css";
import "antd/dist/antd.min.css";

export const DefaultCard = (props) => {
  return <div className="cardContainer">{props.children}</div>;
};

//comment title and extra  lines to get a card with a header
export const AntdCard = ({
  children,
  //   title = "Default Title",
  title = null,
  urlLink = "#",
  width = "90%",
  bordered = true,
  loading =  false
}) => {
  const style = { width: width };
  return (
    <Card
      title={title}
      //   extra={<a href={urlLink}>More...</a>}
      extra={null}
      style={style}
      bordered={bordered}
      hoverable
      loading = {loading}
    >
      {children}
    </Card>
  );
};
