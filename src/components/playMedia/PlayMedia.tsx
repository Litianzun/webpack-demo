import * as React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Popover, List } from "antd";
import "./PlayMedia.less";
import Color from "../../widget/Color";
import { reducerConnect } from "../../reducer/Reducer";
import { getSong } from "../../utils/getSong";

interface playlistItemProps {
  id?: string;
  name?: string;
  ar?: [];
  artists?: [];
}
interface playMediaProps extends playlistItemProps {
  al?: { picUrl: string };
  url?: string;
}

const PlayMedia: React.FC<playMediaProps> = (props) => {
  const [hiddenFlag, setflag] = React.useState(false);
  const audioRef = React.useRef(null);
  const [playState, setPlayState] = React.useState(false); //播放状态
  let timer: NodeJS.Timeout = null;
  function toHide() {
    //鼠标移开三秒之后，向下收起
    timer = setTimeout(() => {
      setflag(true);
    }, 3000);
  }
  function toShow() {
    setflag(false);
    clearTimeout(timer);
  }

  function renderPlaylist() {
    const list = localStorage.getItem("playlist");
    return (
      <div style={{ height: "300px", overflowY: "scroll" }}>
        <List
          dataSource={JSON.parse(list)}
          renderItem={renderPlaylistItem}
          itemLayout="vertical"
          size="small"
        />
      </div>
    );
  }

  function renderPlaylistItem(item: playlistItemProps) {
    return (
      <List.Item
        onDoubleClick={async () => {
          await getSong(item);
        }}
        extra={creatorFormat(item.ar || item.artists)}
        style={{ backgroundColor: item.id === props.id ? "#eee" : "#fff" }}
      >
        {item.name}
      </List.Item>
    );
  }
  React.useEffect(() => {
    toShow();
    toHide();
    //存储到播放列表
    const playlist = localStorage.getItem("playlist");
    const newList = playlist ? JSON.parse(playlist) : [];
    const filterIndex = newList.findIndex(
      (item2: { id: string }) => item2.id === props.id
    );
    if (filterIndex == -1 && props.id) {
      newList.push(props);
    }
    localStorage.setItem("playlist", JSON.stringify(newList));
  }, [props]);
  return (
    <div
      className="player"
      style={{
        backgroundColor: Color.defaultColor,
        transform: hiddenFlag ? `translateY(120px)` : `translateY(0px)`,
      }}
      onMouseLeave={toHide}
      onMouseEnter={toShow}
    >
      <div>
        <h2>{props.name}</h2>
        <span>{props.ar && creatorFormat(props.ar)}</span>
      </div>
      <div
        className="player-ico"
        style={{
          backgroundImage: `url(${props.al && props.al.picUrl})`,
          animationPlayState: playState ? "running" : "paused",
        }}
      />
      <audio
        src={props.url}
        autoPlay
        controls
        className="systemplayer"
        ref={audioRef}
        id="audio"
        onPause={() => {
          setPlayState(false);
        }}
        onPlay={() => {
          setPlayState(true);
        }}
        onEnded={async () => {
          const playlist = localStorage.getItem("playlist");
          if (playlist) {
            //如果播放列表有下一首歌，自动播放
            const newList = playlist ? JSON.parse(playlist) : [];
            const filterIndex = newList.findIndex(
              (item: { id: string }) => item.id === props.id
            ); //当前播放的列表index
            if (!(newList.length === filterIndex + 1)) {
              await getSong(newList[filterIndex + 1]);
            }
          }
        }}
      >
        您的浏览器不支持audio标签
      </audio>
      <div className="player-toolBox">
        {/* 播放列表 */}
        <Popover content={renderPlaylist()} title="播放列表" trigger="click">
          <UnorderedListOutlined style={{ fontSize: "15px" }} />
        </Popover>
      </div>
    </div>
  );
};

export default reducerConnect(PlayMedia);

function creatorFormat(e: { name: string }[]) {
  if (e) {
    const arr = e.map((item) => item.name);
    return arr.join("/");
  }
}
