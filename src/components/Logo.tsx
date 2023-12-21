import { FC } from 'react'
import { Typography, Space } from 'antd'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
const { Title } = Typography
export default (() => {
  return (
    <div className={styles.container}>
      <Link to="/home">
         <Space>
        <Title>
          <FormOutlined />
        </Title>
        <Title>饼干问卷</Title>
      </Space>
      </Link>
     
    </div>
  )
}) as FC
