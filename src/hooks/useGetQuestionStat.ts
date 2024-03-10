import { useSearchParams, useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionStatListServices } from '../services/stat'
import { StatQuestion } from '../types/stat'
import {
  DEFAULT_STAT_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY
} from '../const'

const useGetQuestionStat = () => {
  const [searchParams] = useSearchParams()
  const { id = '' } = useParams()
  const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
  const pageSize =
    Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || DEFAULT_STAT_PAGE_SIZE
  const { loading, data, error } = useRequest(
    async () => {
      const res = await getQuestionStatListServices<StatQuestion>(id, {
        page,
        pageSize
      })
      return res
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return {
    loading,
    total: data?.total,
    list: data?.list,
    error
  }
}
export default useGetQuestionStat
