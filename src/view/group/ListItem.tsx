import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { TemplateGroupItemDesc } from '../../types/question'
import styles from './QuestionGroupListItem.module.scss'
import useDuplicateQuestionTemplate from '../../hooks/useDuplicateQuestionTemplate'
interface Props {
  item: TemplateGroupItemDesc
}
export default ((props) => {
  const { item } = props
  const navigate = useNavigate()
  const { loading, duplicateQuestion } = useDuplicateQuestionTemplate()
  const handleClick = (id: number) => {
    navigate(`/question/template/${id}`)
  }
  const handleDuplicateQuestion = (questionId: number) => {
    duplicateQuestion(questionId)
  }
  return (
    <div key={item.id}>
      <div className={styles['item-container']}>
        <span
          className={styles['item-title']}
          onClick={() => {
            handleClick(item.id)
          }}
        >
          {item.title}
        </span>
        <div className={styles['item-right']}>
          <span className={styles['item-create-at']}>
            发布于 {item.createAt}
          </span>
          <Tooltip title="复制问卷" color="#108ee9">
            <Button
              disabled={loading}
              style={{
                color: '#999'
              }}
              size="small"
              icon={<CopyOutlined />}
              onClick={() => {
                handleDuplicateQuestion(item.id)
              }}
            ></Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}) as FC<Props>
