import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_LIST_PATHNAME,
  LOGIN_PATHNAME
} from '../router'
import useGetUserInfo from './useGetUserInfo'
const useNavPage = (waitingUserData: boolean) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { email } = useGetUserInfo()
  useEffect(() => {
    if (waitingUserData) return
    if (email) {
      // 已登录
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_LIST_PATHNAME)
      }
      return
    }
    // 未登录
    if (!isNoNeedUserInfo(pathname)) {
      navigate(LOGIN_PATHNAME)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingUserData, email, pathname])
}
export default useNavPage
