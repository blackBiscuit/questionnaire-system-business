import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionServices } from '../services/question'
import { resetComponentsReducer } from '../store/componentReducer'
import { resetPageInfoReducer } from '../store/pageInfoReducer'
import { QuestionInfo } from '../types/question'

const useLoadQuestionData = () => {
  const dispatch = useDispatch()
  const { id = NaN } = useParams()
  const [noData, setNoData] = useState(false)
  const { run, data, error, loading } = useRequest(
    async (id: number) => {
      if (isNaN(id)) throw new Error('没有问卷 id')
      const data = await getQuestionServices<QuestionInfo | null>(+id)
      return data
    },
    {
      manual: true,
      onError(){}
    }
  )
  useEffect(() => {
    if (!data) {
      setNoData(true)
      return
    }
    setNoData(false)
    const {
      componentList,
      title,
      desc = '',
      startTime,
      endTime,
      isPublished = false,
      answerCount
    } = data
    const selectedId =
      componentList.length > 0 ? componentList[0].component_id : ''
    const formatStartTime = startTime ? new Date(startTime) : null
    const formatEndTime = endTime ? new Date(endTime) : null
    dispatch(
      resetComponentsReducer({
        componentList,
        selectedId,
        copiedComponent: null
      })
    )
    dispatch(
      resetPageInfoReducer({
        title,
        desc,
        timerType: startTime && endTime ? 'closed' : 'open',
        resetTitle: title,
        isPublished,
        answerCount,
        time: null,
        startTime: formatStartTime,
        endTime: formatEndTime
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  useEffect(() => {
    run(+id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return {
    loading,
    error,
    noData
  }
}
export default useLoadQuestionData
