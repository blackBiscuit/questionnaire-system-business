import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentReducer'
const useGetComponentInfo = () => {
  const { componentList, selectedId, copiedComponent } = useSelector<
    StateType,
    ComponentsStateType
  >((state) => state.component.present)
  const selectedComponent = componentList.find(
    (component) => component.component_id === selectedId
  )
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent
  }
}
export default useGetComponentInfo
