import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'
const useGetPageInfoData = () => {
  const { title, desc, js, css,resetTitle,isPublished } = useSelector<StateType, PageInfoType>(
    (state) => state.pageInfo
  )
  return {
    title,
    desc,
    js,
    css,
    resetTitle,
    isPublished
  }
}
export default useGetPageInfoData
