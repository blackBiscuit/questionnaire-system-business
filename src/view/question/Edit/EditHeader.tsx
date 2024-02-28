import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import EditToolBar from './EditToolBar'
import TitleElement from './TitleElement'
import SaveButton from './SaveButton'
import PublishButton from './PublishButton'
import useGetPageInfoData from '../../../hooks/useGetPageInfoData'
import { changePageTitleReducer } from '../../../store/pageInfoReducer'
import styles from './EditHeader.module.scss'
import CancelPublishButton from './CancelPublishButton'
export default (() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title, resetTitle } = useGetPageInfoData()
  const handleTitleChange = (title: string) => {
    dispatch(changePageTitleReducer({ title }))
  }
  const handleTitleBlurAndEnter = (title: string) => {
    const newTitle = title ? title : resetTitle
    dispatch(changePageTitleReducer({ title: newTitle, type: 'blur' }))
  }
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
            <TitleElement
              onChange={handleTitleChange}
              onBlur={handleTitleBlurAndEnter}
              onPressEnter={handleTitleBlurAndEnter}
              title={title}
            />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
            <CancelPublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}) as FC
