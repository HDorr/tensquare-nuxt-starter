import Cookies from 'js-cookie'

const TokenKey='User-Token'
const NameKey='User-Name'
const AvatarKey='User-Avatar'
// 将信息设置进cookies
export function setUser(token, name, avatar) {
  Cookies.set(TokenKey,token)
  Cookies.set(NameKey,name)
  Cookies.set(AvatarKey,avatar)
}
// 将cookies信息提取出来
export function getUser() {
  return {
    token: Cookies.get(TokenKey),
    name: Cookies.get(NameKey),
    avatar: Cookies.get(AvatarKey),
  }
}
  //清除cookies信息
  export function removeUser() {
      Cookies.remove(TokenKey),
      Cookies.remove(NameKey),
      Cookies.remove(AvatarKey)
  }
