import * as React from "react";
import "./SectionTitle.less";
import Color from "../../widget/Color";
import { string } from "prop-types";

interface sectionTitleProps {
  title: string;
  style?: React.CSSProperties;
  rightContent?: string | React.ReactNode;
}
const SectionTitle = (props: sectionTitleProps) => {
  return (
    <div className="sectionTitle" style={props.style}>
      {/* <div className="prefix" /> */}
      <div className="sectionTitle-content">
        <span>{props.title}</span>
        <a className="sectionTitle-content-more">{props.rightContent}</a>
      </div>
      <hr style={{ borderColor: Color.defaultColor }} />
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  title: string,
  rightContent: string,
};
