import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'
const useGetUserInfo = () => {
  const { email, username } = useSelector<StateType,UserStateType>(
    (state) => state.user
  ) 
  return {
    username,email
  }
}
export default useGetUserInfo
