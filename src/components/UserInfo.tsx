import { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import styles from './UserInfo.module.scss'
export default (() => {
  return (
    <div>
      <Link to={LOGIN_PATHNAME}>
        <span
        className={styles['login-text']}
        
        >
          登录
        </span>
      </Link>
    </div>
  )
}) as FC
