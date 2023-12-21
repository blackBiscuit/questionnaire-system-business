import { FC, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Button, Divider, Space, message } from 'antd'
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined
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
  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            disabled={loading}
            onClick={handleCreate}
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          >
            创建问卷
          </Button>
          <Divider />
          {/* <Button
            size="large"
            icon={<UnorderedListOutlined />}
            onClick={() => {
              navigate('list')
            }}
          >
            我的问卷
          </Button>
          <Button
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              navigate('star')
            }}
          >
            星标问卷
          </Button>
          <Button
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              navigate('trash')
            }}
          >
            回收站
          </Button> */}
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
