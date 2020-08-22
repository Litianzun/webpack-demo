import React from "react";
import { Row, Tag } from "antd";
import AlbumTools from "../../../components/albumTools/AlbumTools";
import SongsTable from "../../../components/songsTable/SongsTable";
import { reducerConnect } from "../../../reducer/Reducer";
import day from "dayjs";

const PlaylistMain = (props) => {
  console.log(props);
  return (
    <>
      <div className="my-right-playlist">
        <img src={props.coverImgUrl} alt="playlist-cover" />
        <div className="my-right-playlist-main">
          <Row>
            <Tag color="red">歌单</Tag>
            <span className="my-right-playlist-main-title">{props.name}</span>
          </Row>
          {props.creator && (
            <Row style={{ marginTop: "13px" }} align="middle">
              <img src={props.creator.avatarUrl} />
              <a style={{ marginLeft: "12px" }}>
                {props.creator && props.creator.nickname}
              </a>
              <small style={{ marginLeft: "12px",marginTop: '4px' }}>
                {day(props.creator.birthday).format("YYYY-MM-DD")}创建
              </small>
            </Row>
          )}
          <AlbumTools style={{ marginTop: "13px", width: "400px" }} />
        </div>
      </div>
      <SongsTable songs={props.tracks || []} dispatch={props.dispatch} />
    </>
  );
};

export default reducerConnect(PlaylistMain);