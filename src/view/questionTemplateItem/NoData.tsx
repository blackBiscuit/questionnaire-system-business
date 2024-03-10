import { FC } from 'react'
import { Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './NoData.module.scss'

export default (() => {
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles['no-data']}>
        <Empty imageStyle={{ height: 60 }} description="当前问卷不存在">
          <Button
            type="primary"
            onClick={() => {
              navigate('/template')
            }}
          >
            返回问卷调查模板
          </Button>
        </Empty>
      </div>
    </div>
  )
}) as FC
