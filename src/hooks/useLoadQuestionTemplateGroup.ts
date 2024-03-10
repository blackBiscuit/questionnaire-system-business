import {} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionGroupServices } from '../services/question'
import { TemplateGroup } from '../types/question'
const useLoadQuestionTemplateGroup = () => {
  const [searchParams] = useSearchParams()
  const { data, loading } = useRequest(
    async () => {
      const typeStr = searchParams.get('type')
      const isAll = !typeStr || isNaN(Number(typeStr))
      const type = isAll ? undefined : Number(typeStr)
      const data = await getQuestionGroupServices<TemplateGroup[]>(type)
      return data
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return { data, loading }
}
export default useLoadQuestionTemplateGroup
