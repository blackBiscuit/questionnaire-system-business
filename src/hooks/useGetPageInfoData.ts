import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'
const useGetPageInfoData = () => {
  const { title, desc, js, css,resetTitle } = useSelector<StateType, PageInfoType>(
    (state) => state.pageInfo
  )
  return {
    title,
    desc,
    js,
    css,
    resetTitle
  }
}
export default useGetPageInfoData
