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
      console.log(data)
      return data
    },
    {
      manual: true
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
      js = '',
      css = '',
      isPublished = false,
      answerCount
    } = data
    const selectedId =
      componentList.length > 0 ? componentList[0].component_id : ''
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
        js,
        css,
        resetTitle: title,
        isPublished,
        answerCount
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
