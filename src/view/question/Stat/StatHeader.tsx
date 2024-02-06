import { FC } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Space, Typography } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { QUESTION_EDIT } from '../../../router'
import LinkAndQrCode from './LinkAndQRCode'

import styles from './StatHeader.module.scss'

const { Title } = Typography

export default (() => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { title } = useGetPageInfoData()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['header-content']}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                navigate(-1)
              }}
            >
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <LinkAndQrCode />
        </div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              navigate(`${QUESTION_EDIT}/${id}`)
            }}
            icon={<EditOutlined />}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}) as FC
