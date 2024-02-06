import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Result } from 'antd'

import styles from './NoPublish.module.scss'
export default (() => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <Result
        status="warning"
        title="问卷尚未发布"
        subTitle="抱歉，当前问卷尚未发布,请发布后再访问吧!"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate(-1)
            }}
          >
            返回
          </Button>
        }
      />
    </div>
  )
}) as FC
