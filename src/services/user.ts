/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginParams, RegisterParams } from '../types/user'
import axios, { controller } from './ajax'
export const getUserInfoServices = async <T extends Record<string, any>>() => {
  const url = '/api/user/info'
  return (await axios.get(url, { signal: controller.signal })) as T
}

export const userRegisterServices = async <T extends Record<string, any>>(
  data: RegisterParams
) => {
  const url = '/api/user/register'
  return (await axios.post(url, data)) as T
}
export const getEmailCodeServices = async <T extends Record<string, any>>(
  data: {
    email: string
  },
  isForget?: boolean
) => {
  const url = '/api/user/email/code'
  return (await axios.post(url, data, { params: { isForget } })) as T
}

export const userLoginServices = async <T extends Record<string, any>>(
  data: LoginParams
) => {
  const url = '/api/user/login'
  return (await axios.post(url, data)) as T
}
export const updateUserInfoServices = async <T extends Record<string, any>>(
  data: Partial<Omit<RegisterParams, 'email'>> & {
    email: string
  }
) => {
  const url = '/api/user/forget'
  return (await axios.patch(url, data)) as T
}
