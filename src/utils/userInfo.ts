import { UserInfo } from '../types/user'

const token_key = 'USER_TOKEN'
const user_info_key = 'USER_INFO'
export const setToken = (val: string) => {
  localStorage.setItem(token_key, val)
}
export const getToken = () => localStorage.getItem(token_key)
export const removeToken = () => {
  localStorage.removeItem(token_key)
}
export const setUserInfo = (val: UserInfo) => {
  localStorage.setItem(user_info_key, JSON.stringify(val))
}
export const getUserInfo = () => {
  const userInfoStr = localStorage.getItem(user_info_key)
  return userInfoStr ? (JSON.parse(userInfoStr) as UserInfo) : null
}
export const removeUserInfo = () => {
  localStorage.removeItem(user_info_key)
}
