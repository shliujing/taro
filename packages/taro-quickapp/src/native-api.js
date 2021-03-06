import {
  onAndSyncApis,
  noPromiseApis,
  otherApis,
  initPxTransform
} from '@tarojs/taro'
import request from './api/request'
import storage from './api/storage'
import router from './api/router'
import interactive from './api/interactive'
import equipment from './api/equipment'

function processApis (taro) {
  const weApis = Object.assign({}, onAndSyncApis, noPromiseApis, otherApis)
  Object.keys(weApis).forEach(key => {
    taro[key] = () => {
      console.log(`暂时不支持 ${key}`)
    }
  })
}

function canIUseWebp () {
  return true
}

function pxTransform (size) {
  return size + 'px'
}

export default function initNativeApi (taro) {
  processApis(taro)
  taro.request = request
  taro.canIUseWebp = canIUseWebp
  taro.initPxTransform = initPxTransform.bind(taro)
  taro.pxTransform = pxTransform.bind(taro)
  Object.assign(taro, storage, router, interactive, equipment)
}
