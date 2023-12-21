import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'
import { HOME_PATHNAME } from '../router'
import styles from './NotFount.module.scss'
export default (() => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate(HOME_PATHNAME)
            }}
          >
            回到首页
          </Button>
        }
      />
    </div>
  )
}) as FC
