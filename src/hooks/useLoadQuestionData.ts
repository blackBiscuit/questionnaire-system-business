import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionServices } from '../services/question'
import { QuestionData } from '../types/question'
const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const load = async () => {
    return await getQuestionServices<QuestionData>(id)
  }
  const { data: questionData, loading, error } = useRequest(load)
  //   useEffect(() => {
  //     setLoading(true)
  //     getQuestionServices<QuestionData>(id).then((res) => {
  //       console.log(res)
  //       setQuestionData(res)
  //       setLoading(false)
  //     })
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [])
  return {
    loading,
    questionData,
    error
  }
}
export default useLoadQuestionData
