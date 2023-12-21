/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterParams } from '../types/user'
import axios from './ajax'
export const getUserInfoServices = async <T extends Record<string, any>>() => {
  const url = '/api/user/info'
  return (await axios.get(url)) as T
}

export const userRegisterServices = async <T extends Record<string, any>>(
  data: RegisterParams
) => {
  const url = '/api/user/register'
  return (await axios.post(url, data)) as T
}
export const getEmailCodeServices = async <T extends Record<string, any>>(
  data: {email:string}
) => {
  const url = '/api/user/email/code'
  return (await axios.post(url, data)) as T
}
interface LoginParams {
  email: string
  password: string
}
export const userLoginServices = async <T extends Record<string, any>>(
  data: LoginParams
) => {
  const url = '/api/user/login'
  return (await axios.post(url, data)) as T
}
