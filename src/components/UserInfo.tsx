import { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { logoutReducer } from '../store/userReducer'
import { LOGIN_PATHNAME } from '../router'
import styles from './UserInfo.module.scss'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { removeToken } from '../utils/userInfo'
export default (() => {
  const dispatch = useDispatch()
 // const { data: userInfo } = useRequest(getUserInfoServices<UserInfo>)
  const { username} = useGetUserInfo()
  const navigate = useNavigate()
  // const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  // const [token, setToken] = useState<null | string>(null)
  // const location = useLocation()
  const logout = () => {
    removeToken()
    dispatch(logoutReducer())
    // removeUserInfo()
    navigate(LOGIN_PATHNAME)
    message.success('退出成功')
  }
  const Login = (
    <Link to={LOGIN_PATHNAME}>
      <span className={styles['login-text']}>登录</span>
    </Link>
  )
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserAddOutlined />
        {username}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  return <div>{username ? UserInfo : Login}</div>
}) as FC
