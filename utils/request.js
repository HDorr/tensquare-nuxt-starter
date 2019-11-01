import axios from 'axios'
import {getUser} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.138.132:7300/mock/5d99d7d7e96b040d3a87564d', // api的base_url
  timeout: 30000, // 请求超时时间
  // 每次请求,加上头信息,方面一些需登录的验证
  headers: { 'Authorization': 'Bearer '+getUser().token }
})



export default service
