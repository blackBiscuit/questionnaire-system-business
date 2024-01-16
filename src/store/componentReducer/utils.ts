import { ComponentInfoType, ComponentsStateType } from '.'
import { QuestionComponent } from '../../components/QuestionComponents'

export const getNextSelectId = (
  currentId: string,
  componentList: ComponentInfoType[]
) => {
  const visibleComponentList = componentList.filter(
    (component) => !component.isHidden
  )
  const index = visibleComponentList.findIndex(
    (component) => component.component_id === currentId
  )
  if (index < 0) return ''
  const len = visibleComponentList.length
  if (len <= 1) return ''
  const nextIndex = index + 1 < len ? index + 1 : index - 1
  return visibleComponentList[nextIndex].component_id
}
export const insertNewComponent = (
  draft: ComponentsStateType,
  newComponent: QuestionComponent
) => {
  const { componentList, selectedId } = draft
  const i = componentList.findIndex(
    (component) => component.component_id === selectedId
  )
  const newComponentIndex = i > -1 ? i + 1 : componentList.length
  // const newComponent = {
  //   ...copiedComponent,
  //   component_id: ulid()
  // } as QuestionComponent
  componentList.splice(newComponentIndex, 0, newComponent)
}
