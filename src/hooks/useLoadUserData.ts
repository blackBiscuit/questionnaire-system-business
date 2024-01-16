import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from 'ahooks'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '../store/userReducer'
import { getUserInfoServices } from '../services/user'
import { UserInfo } from '../types/user'
const useLoadUserData = () => {
  const dispatch = useDispatch()
  const { run } = useRequest(getUserInfoServices<UserInfo>, {
    manual: true,
    onSuccess(res) {
      const { email, username } = res
      dispatch(
        loginReducer({
          email,
          username
        })
      )
    },
    onFinally() {
      setWaitingUserData(false)
    }
  })
  const { email } = useGetUserInfo()
  const [waitingUserData, setWaitingUserData] = useState(true)
  useEffect(() => {
    if (email) {
      setWaitingUserData(false)
      return
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  return { waitingUserData }
}
export default useLoadUserData
