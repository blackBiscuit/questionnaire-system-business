import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'

import { getQuestionServices } from '../services/question'
import { resetComponentsReducer } from '../store/componentReducer'
import { resetPageInfoReducer } from '../store/pageInfoReducer'
import { QuestionInfo } from '../types/question'

const useLoadQuestionData = () => {
  const dispatch = useDispatch()
  const { id = '' } = useParams()
  const { run, data, error, loading } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionServices<QuestionInfo>(id)
      return data
    },
    {
      manual: true
    }
  )
  useEffect(() => {
    if (!data) return
    const { componentList, title, desc = '', js = '', css = '' } = data
    const selectedId =
      componentList.length > 0 ? componentList[0].component_id : ''
    dispatch(
      resetComponentsReducer({
        componentList,
        selectedId,
        copiedComponent: null
      })
    )
    dispatch(resetPageInfoReducer({ title, desc, js, css, resetTitle: title }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  useEffect(() => {
    run(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return {
    loading,
    error
  }
}
export default useLoadQuestionData
