import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import styles from './ItemBottom.module.scss'
import useDuplicateQuestionTemplate from '../../hooks/useDuplicateQuestionTemplate'
interface Props {
  groupId: number
  questionId: number
}
export default ((props) => {
  const { loading, duplicateQuestion } =
    useDuplicateQuestionTemplate()
  const { groupId, questionId } = props
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/group/${groupId}`)
  }
  const handleDuplicateQuestion = () => {
    duplicateQuestion(questionId)
  }
  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success('问卷复制成功')
  //     navigate(`/question/edit/${id}`)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccess, id])
  return (
    <div className={styles.bottom}>
      <Button className={styles.btn} size="large" onClick={handleClick}>
        更多问卷
      </Button>
      <Button
        loading={loading}
        disabled={loading}
        className={styles.btn}
        type="primary"
        size="large"
        onClick={handleDuplicateQuestion}
      >
        复制问卷
      </Button>
    </div>
  )
}) as FC<Props>
