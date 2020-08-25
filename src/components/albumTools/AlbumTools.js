import React from "react";
import { Button } from "antd";
import {
  PlayCircleOutlined,
  DownloadOutlined,
  FolderAddOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import "./AlbumTools.less";
import { object } from "prop-types";
import { formatCount } from "../../utils/common";
import { reducerConnect } from "../../reducer/Reducer";
import { getSong } from "../../utils/getSong";

const AlbumTools = (props) => {
  return (
    <div className="albumTools-wrapper" style={props.style}>
      <Button
        size="small"
        icon={<PlayCircleOutlined />}
        type="primary"
        onClick={async () => {
          props.dispatch({
            type: "changeSwitch",
            payload: { playSwitch: true },
          });
          await getSong(props);
        }}
      >
        播放
      </Button>
      <Button size="small" icon={<FolderAddOutlined />}>
        {props.subscribedCount
          ? `(${formatCount(props.subscribedCount)})`
          : "收藏"}
      </Button>
      <Button size="small" icon={<ShareAltOutlined />}>
        {props.shareCount ? `(${formatCount(props.shareCount)})` : "分享"}
      </Button>
      <Button size="small" icon={<DownloadOutlined />}>
        下载
      </Button>
      <Button
        size="small"
        icon={<MessageOutlined />}
        onClick={() => {
          const targetElement = document.querySelector("#commentPoint");
          scrollTo(0, targetElement.offsetTop);
        }}
      >
        {props.commentCount ? `(${formatCount(props.commentCount)})` : "评论"}
      </Button>
    </div>
  );
};

export default reducerConnect(AlbumTools);

AlbumTools.propTypes = {
  style: object,
};
