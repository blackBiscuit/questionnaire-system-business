import { FC } from 'react'
import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { MANAGE_LIST_PATHNAME } from '../router'
const { Paragraph, Title } = Typography
export default (() => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查|在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份,发布问卷 90 份,收到答卷 980份
        </Paragraph>
        <div className={styles['btn-wrapper']}>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              navigate(MANAGE_LIST_PATHNAME)
            }}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}) as FC
