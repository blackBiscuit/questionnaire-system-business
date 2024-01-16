export interface UserInfo {
  email: string
  username: string
}
export interface RegisterParams {
  email: string
  username: string
  emailCode: string
  password: string
}
export interface LoginParams {
  email: string
  password: string
}
export interface LoginResponse {
  token: string
  userInfo: UserInfo
}
