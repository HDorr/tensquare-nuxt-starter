import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.138.132:7300/mock/5d99d7d7e96b040d3a87564d', // api的base_url
  timeout: 30000 // 请求超时时间
})



export default service
