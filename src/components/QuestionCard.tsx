import { FC, useState, useMemo } from 'react'
import { useRequest } from 'ahooks'
import { Button, Space, Tag, Popconfirm, Modal, message } from 'antd'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import {
  EditFilled,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  StarFilled,
  ExclamationCircleFilled
} from '@ant-design/icons'
import {
  updateQuestionServices,
  duplicateQuestionServices
} from '../services/question'
import styles from './QuestionCard.module.scss'
interface Props {
  id: number
  title: string
  answerCount: number
  isStar: boolean
  isPublished: boolean
  createAt: string
  startTime: null | Date
  endTime: null | Date
  onChangeStar?: (id: number, isStar: boolean) => void
  onDelete?: () => void
}
const { confirm } = Modal
export default ((props) => {
  const {
    title,
    answerCount,
    isPublished,
    createAt,
    id,
    isStar: _isStar,
    startTime,
    endTime,
    onChangeStar,
    onDelete
  } = props
  const [searchParams] = useSearchParams()
  const [isDeletedState, setIsDeleteState] = useState(false)
  const [isStar, setIsStar] = useState(_isStar)
  const navigate = useNavigate()
  const keyWord = searchParams.get('keyword')
  const { loading: duplicateLoading, run: runDuplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionServices<{ id: string }>(id)
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        message.success('复制成功')
        navigate(`/question/edit/${data.id}`)
      }
    }
  )
  const keyWordTitle = useMemo(() => {
    if (keyWord) {
      const startIndex = title.indexOf(keyWord)
      if (startIndex > -1) {
        const endIndex = startIndex + keyWord.length
        const startStr = title.slice(0, startIndex)
        const endStr = title.slice(endIndex)
        return (
          <>
            {startStr}
            <span style={{ color: '#FF4848' }}>{keyWord}</span>
            {endStr}
          </>
        )
      }
    }
    return title
  }, [keyWord, title])
  const { loading: deleteLoading, run: runDelete } = useRequest(
    async () =>
      await updateQuestionServices(id, {
        isDeleted: true
      }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功，若需要恢复请前往回收站查看')
        if (onDelete) {
          onDelete()
        } else {
          setIsDeleteState(true)
        }
      }
    }
  )
  const { loading: starLoading, run: runStar } = useRequest(
    async () =>
      await updateQuestionServices(id, {
        isStar: !isStar
      }),
    {
      manual: true,
      onSuccess() {
        const msg = isStar ? '取消收藏成功' : '收藏成功'
        message.success(msg)
        onChangeStar?.(id, !isStar)
        setIsStar(!isStar)
      }
    }
  )
  const handelDelete = () => {
    confirm({
      title: '你确定想要删除该问卷吗?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        runDelete()
      },
      onCancel() {}
    })
  }
  const duplicate = () => {
    runDuplicate()
  }
  if (isDeletedState) return <></>
  const canGoToStat =
    typeof isPublished === 'boolean' &&
    !isPublished &&
    !startTime &&
    !endTime &&
    answerCount <= 0
  return (
    <div className={styles['question-card-wrapper']}>
      <div className={styles['question-card-header']}>
        <Link
          to={isPublished ? `/question/stat/${id}` : `/question/edit/${id}`}
        >
          <div className={styles['question-card-title']}>
            <Space>
              {isStar && <StarOutlined style={{ color: '#D1A20E' }} />}
              <div>{keyWordTitle}</div>
            </Space>
          </div>
        </Link>
        <div className={styles['question-card-right']}>
          <div className={styles['question-status']}>
            {isPublished ? (
              <Tag color="processing">发布中</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
          </div>
          <div className={styles['question-answer-count']}>
            答卷: {answerCount}
          </div>
          <div className={styles['question-creation-time']}>{createAt}</div>
        </div>
      </div>
      <div className={styles['question-card-line']}></div>
      <div className={styles['question-card-tail']}>
        <div className={styles['question-card-tail-left']}>
          <div className={styles['question-card-edit']}>
            <Button
              type="text"
              size="small"
              icon={<EditFilled />}
              onClick={() => {
                navigate(`/question/edit/${id}`)
              }}
            >
              编辑问卷
            </Button>
          </div>
          <div className={styles['question-card-statistics']}>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              disabled={canGoToStat}
              onClick={() => {
                navigate(`/question/stat/${id}`)
              }}
            >
              问卷统计
            </Button>
          </div>
        </div>
        <div className={styles['question-card-tail-right']}>
          <div className={styles['question-card-star']}>
            <Button
              type="text"
              size="small"
              disabled={starLoading}
              icon={
                isStar ? (
                  <StarFilled style={{ color: '#D1A20E' }} />
                ) : (
                  <StarOutlined />
                )
              }
              onClick={() => {
                runStar()
              }}
            >
              {isStar ? '取消标星' : '标星'}
            </Button>
          </div>
          <div className={styles['question-card-copy']}>
            <Popconfirm
              title="确定复制该问卷？"
              onConfirm={duplicate}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <Button
                disabled={duplicateLoading}
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => {}}
              >
                复制
              </Button>
            </Popconfirm>
          </div>
          <div className={styles['question-card-delete']}>
            <Button
              disabled={deleteLoading}
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={handelDelete}
            >
              删除
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}) as FC<Props>
