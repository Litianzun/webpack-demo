import list from '../router/requestList'
import {dispatch} from '../router/router'

export async function getSong(songInfo) {
  const params = {
    id: songInfo.id,
  };
  const res = await list.getSongUrl(params);
  if (res.code === 200) {
    dispatch({
      type: "setSong",
      payload: { song: res.data && res.data.length > 0 ? Object.assign({}, res.data[0], songInfo) : null },
    });
  } else {
    console.log("获取歌曲信息失败!");
  }
}
