import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'
const useGetPageInfoData = () => {
  const {
    title,
    desc,
    resetTitle,
    isPublished,
    answerCount,
    timerType,
    time,
    startTime,
    endTime
  } = useSelector<StateType, PageInfoType>((state) => state.pageInfo)
  return {
    title,
    desc,
    timerType,
    resetTitle,
    isPublished,
    answerCount,
    time,
    startTime,
    endTime
  }
}
export default useGetPageInfoData
