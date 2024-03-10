import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionTemplateServices } from '../services/question'
import { message } from 'antd'
const useDuplicateQuestionTemplate = () => {
  const navigate = useNavigate()
  const { loading, run } = useRequest(
    async (id: number) => {
      const data = await duplicateQuestionTemplateServices<{
        id: number
      } | null>(id)
      return data
    },
    {
      manual: true,
      onSuccess: (data) => {
       
        if (data) {
          const questionId = data.id
          message.success('问卷复制成功')
          navigate(`/question/edit/${questionId}`)
        }
      },
      onError() {}
    }
  )
  return {  loading,  duplicateQuestion: run }
}
export default useDuplicateQuestionTemplate
