import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentReducer'
//获取撤销重做储存数组储存信息
const useGetComponentInfo = () => {
  const past = useSelector<StateType, ComponentsStateType[]>(
    (state) => state.component.past
  )
  return {
    past
  }
}
export default useGetComponentInfo
