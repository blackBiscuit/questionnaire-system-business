import {} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  DEFAULT_LIST_PAGE_SIZE
} from '../const'
import { getQuestionListServices } from '../services/question'
import { QuestionListData } from '../types/question'
interface ParamsOptions {
  isStar: number
  isDeleted: number
}
const useLoadQuestionListData = (opt: Partial<ParamsOptions> = {}) => {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
      const pageSize =
        Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) ||
        DEFAULT_LIST_PAGE_SIZE
      const data = getQuestionListServices<QuestionListData>({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize
      })
      return data
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return {
    data,
    loading,
    error,
    refresh
  }
}
export default useLoadQuestionListData
