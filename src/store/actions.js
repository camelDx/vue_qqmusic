import * as types from './mutations-types.js'
import {
  utilsArray
} from "common/js/utils";
import {
  localSave, localDel, localClear
} from "common/js/cache";




//找到新列表中的指定索引
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  // 避免随机播放时，点击歌单，播放歌曲乱序
  if (state.mode === 2) {
    let randomList = utilsArray.shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)


}

// 随机播放全部按钮
export const randomPlay = function ({
  commit
}, {
  list
}) {
  commit(types.SET_MODE, 2) //随机播放
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYLIST, utilsArray.shuffle(list))
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
}

// 新增歌曲到播放列表
export const insertSong = function ({
  commit,
  state
}, song) {
  // 浅复制
  let playlist     = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]

  // 查询待添加的歌曲是否已在播放列表中
  let fpIndex = findIndex(playlist, song)

  // 插入到当前索引 要插入的位置是当前索引的下一首
  currentIndex++
  // 插入一首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)

  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fpIndex > -1) {
    // 插入的序号大于 列表中的序号 【1，2，3，4】
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 插入到 sequenceList 中的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  // 查询待添加的歌曲是否已在 sequenceList 列表中
  let fsIndex = findIndex(sequenceList, song)

  // 插入到当前索引
  sequenceList.splice(currentSIndex, 0, song)

  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}


/**
 * 保存搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const saveHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query))
}

/**
 * 删除单个搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const delHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query))
}

/**
 * 删除全部搜索历史
 * @param  {[type]} query          搜索关键词
 */
export const clearHistory = function ({
  commit
}) {
  commit(types.SET_SEARCHHISTORY, localClear())
}