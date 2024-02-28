import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'
const useGetPageInfoData = () => {
  const { title, desc, js, css, resetTitle, isPublished,answerCount } = useSelector<
    StateType,
    PageInfoType
  >((state) => state.pageInfo)
  return {
    title,
    desc,
    js,
    css,
    resetTitle,
    isPublished,
    answerCount
  }
}
export default useGetPageInfoData
