import { FC, useMemo } from 'react'
import { Typography, Space } from 'antd'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import useGetUserInfo from '../hooks/useGetUserInfo'
import styles from './Logo.module.scss'
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../router'
const { Title } = Typography
export default (() => {
  const { username } = useGetUserInfo()
  const pathname = useMemo(() => (username ? HOME_PATHNAME : LOGIN_PATHNAME), [username])
  return (
    <div className={styles.container}>
      <Link to={pathname}>
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
