import { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Divider, Space, message } from 'antd'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
  FileAddOutlined
} from '@ant-design/icons'
import { createQuestionServices } from '../services/question'
import styles from './ManageLayout.module.scss'
export default (() => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const navList = [
    {
      path: 'list',
      label: '我的问卷',
      icon: <UnorderedListOutlined />,
      onClick() {
        navigate('list')
      }
    },
    {
      path: 'star',
      label: '星标问卷',
      icon: <StarOutlined />,
      onClick() {
        navigate('star')
      }
    },
    {
      path: 'trash',
      label: '回收站',
      icon: <DeleteOutlined />,
      onClick() {
        navigate('trash')
      }
    }
  ]
  const handleCreate = async () => {
    setLoading(true)
    const data = await createQuestionServices()
    const { id } = data || {}
    if (id) {
      navigate(`/question/edit/${id}`)
      message.success('创建成功')
    }
    setLoading(false)
  }
  const handleGetTemplate = () => {
    navigate('/template')
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Space>
            <Button
              disabled={loading}
              onClick={handleCreate}
              type="primary"
              icon={<PlusOutlined />}
            >
              创建问卷
            </Button>
            <Button onClick={handleGetTemplate} icon={<FileAddOutlined />}>获取模板</Button>
          </Space>
          <Divider />
          {navList.map((nav) => (
            <Button
              type={location.pathname.includes(nav.path) ? 'default' : 'text'}
              key={nav.path}
              size="large"
              icon={nav.icon}
              onClick={nav.onClick}
              // className={
              //   location.pathname.includes(nav.path)
              //     ? styles['current-btn']
              //     : ''
              // }
            >
              {nav.label}
            </Button>
          ))}
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}) as FC
