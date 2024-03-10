import { FC, useState } from 'react'
import { Empty, Table, Tag, Space, Button, message, Modal } from 'antd'
import { useRequest } from 'ahooks'
import {
  UndoOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
// import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './Content.module.scss'
import {
  updateQuestionsServices,
  deleteQuestionsServices
} from '../../services/question'
import { QuestionData } from '../../types/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { DEFAULT_QUESTION_DATA, TRUE_NUMBER } from '../../const'
import Loading from '../../components/Loading'
import ListPagination from '../../components/ListPagination'
import { DELETE_FILE_MESSAGE } from '../../const/message'
interface DataType {
  title: string
  isPublished: boolean
  answerCount: number
  createAt: string
}
const { confirm } = Modal
export default (() => {
  const {
    data = DEFAULT_QUESTION_DATA,
    loading,
    refresh
  } = useLoadQuestionListData({
    isDeleted: TRUE_NUMBER
  })
  const { list: questions, total = 0 } = data
  const tableColumns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt'
    }
  ]
  const [selectionKeys, setSelectionKeys] = useState<number[]>([])
  const { run: recoverRun } = useRequest(
    async () => {
      const lists = selectionKeys.map<Partial<QuestionData> & { id: number }>(
        (id) => ({
          id,
          isDeleted: false
        })
      )
      return await updateQuestionsServices(lists)
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        setSelectionKeys([])
        refresh()
        message.success('恢复成功')
      }
    }
  )
  const { run: deleteRun } = useRequest(
    async () => {
      return await deleteQuestionsServices(selectionKeys)
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        setSelectionKeys([])
        refresh()
        message.success('删除成功')
      }
    }
  )
  const handleDelete = () => {
    confirm({
      title: DELETE_FILE_MESSAGE,
      icon: <ExclamationCircleFilled />,
      okText: '是的',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteRun()
      }
    })
  }
  return (
    <div className={styles['lists-wrapper']}>
      <div className={styles['lists-headers']}>
        <h1 className={styles['question-list-title']}>回收站</h1>
        <div className={styles['question-search-wrapper']}>
          <ListSearch />
        </div>
      </div>
      {loading && <Loading />}
      {!loading && (
        <>
          {questions.length > 0 ? (
            <>
              <div className={styles['question-list-content']}>
                <Space
                  style={{
                    marginBottom: '10px'
                  }}
                >
                  <Button
                    onClick={recoverRun}
                    disabled={selectionKeys.length === 0}
                    type="primary"
                    icon={<UndoOutlined />}
                  >
                    恢复
                  </Button>
                  <Button
                    disabled={selectionKeys.length === 0}
                    onClick={handleDelete}
                    danger
                    icon={<DeleteOutlined />}
                  >
                    彻底删除
                  </Button>
                </Space>
                <Table
                  rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys: React.Key[]) => {
                      setSelectionKeys(selectedRowKeys as number[])
                    }
                  }}
                  rowKey={'id'}
                  dataSource={questions}
                  columns={tableColumns}
                  pagination={false}
                />
              </div>
              <div className={styles['question-pagination-container']}>
                <ListPagination total={total} />
              </div>
            </>
          ) : (
            <Empty description="暂无数据" />
          )}
        </>
      )}
    </div>
  )
}) as FC
