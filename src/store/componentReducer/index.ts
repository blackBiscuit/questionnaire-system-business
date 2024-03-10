import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ulid } from 'ulid'
import cloneDeep from 'lodash.clonedeep'
import { produce } from 'immer'
import {
  QuestionComponent,
  QuestionComponentPropsType
} from '../../components/QuestionComponents'
import { getNextSelectId, insertNewComponent } from './utils'
export type ComponentInfoType = QuestionComponent
export interface ComponentsStateType {
  componentList: ComponentInfoType[]
  selectedId: string
  copiedComponent: ComponentInfoType | null
}
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置组件
    resetComponentsReducer(
      _state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) {
      return action.payload
    },
    // resetComponents: produce(
    //   (
    //     draft: ComponentsStateType,
    //     action: PayloadAction<ComponentsStateType>
    //   ) => {
    //     const { componentList, selectedId, copiedComponent } = action.payload
    //     draft.componentList = componentList
    //     draft.selectedId = selectedId
    //     draft.copiedComponent = copiedComponent
    //   }
    // ),
    //设置当前选中组件
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload
      }
    ),
    //添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        insertNewComponent(draft, action.payload)
        // const index = componentList.findIndex(
        //   (component) => component.component_id === selectedId
        // )
        // index > -1
        //   ? draft.componentList.splice(index + 1, 0, action.payload)
        //   : draft.componentList.push(action.payload)
        draft.selectedId = action.payload.component_id
      }
    ),
    // 修改组件属性
    changeComponentReducer: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{
          id: string
          props: QuestionComponentPropsType
        }>
      ) => {
        const { componentList } = draft
        const { id, props } = action.payload
        const index = componentList.findIndex(
          (component) => component.component_id === id
        )
        if (index > -1) {
          draft.componentList[index].props = props
        }
      }
    ),
    // 删除选中组件
    deleteSelectedComponentReducer: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId: deleteId } = draft
      const nextSelectedId = getNextSelectId(deleteId, componentList)
      const index = componentList.findIndex(
        (component) => component.component_id === deleteId
      )
      if (index > -1) {
        draft.componentList.splice(index, 1)
        draft.selectedId = nextSelectedId
      }
    }),
    // 切换组件显示和隐藏
    changeComponentHiddenReducer: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{
          id: string
          hidden: boolean
        }>
      ) => {
        const { componentList } = draft
        const { id, hidden } = action.payload
        const nextSelectedId = getNextSelectId(id, componentList)
        const index = componentList.findIndex(
          (component) => component.component_id === id
        )
        if (index > -1) {
          draft.componentList[index].isHidden = hidden
          // 隐藏选中下一个组件 显示则选中当前组件
          draft.selectedId = hidden ? nextSelectedId : id
        }
      }
    ),
    //切换锁定状态
    lockedComponentReducer: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        const { componentList } = draft
        const id = action.payload
        const selectedComponent = componentList.find(
          (component) => component.component_id === id
        )
        if (selectedComponent) {
          const { isLocked } = selectedComponent
          selectedComponent.isLocked = !isLocked
        }
      }
    ),
    copySelectedComponentReducer: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId } = draft
      const copiedComponent = componentList.find(
        (component) => component.component_id === selectedId
      )
      if (copiedComponent) {
        draft.copiedComponent = cloneDeep(copiedComponent)
      }
    }),
    pasteCopiedComponentReducer: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (!copiedComponent) return
      const newComponent = {
        ...copiedComponent,
        component_id: ulid()
      } as QuestionComponent
      insertNewComponent(draft, newComponent)
      draft.selectedId = newComponent.component_id
    }),
    selectPrevComponentReducer: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId } = draft
      const index = componentList.findIndex(
        (component) => component.component_id === selectedId
      )
      if (index < 0) return
      const selectIndex = index === 0 ? componentList.length - 1 : index - 1
      draft.selectedId = componentList[selectIndex].component_id
      //if(index === 0)
    }),
    selectNextComponentReducer: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId } = draft
      const index = componentList.findIndex(
        (component) => component.component_id === selectedId
      )
      if (index < 0) return
      const selectIndex = index === componentList.length - 1 ? 0 : index + 1
      draft.selectedId = componentList[selectIndex].component_id
      //if(index === 0)
    }),
    // 改变组件标题
    changeComponentTitleReducer: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        const { selectedId, componentList } = draft
        const selectedComponent = componentList.find(
          (component) => component.component_id === selectedId
        )
        if (selectedComponent) {
          selectedComponent.title = action.payload
        }
      }
    ),
    // 交换组件位置
    moveComponentReducer: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{
          newIndex: number
          oldIndex: number
        }>
      ) => {
        const { componentList } = draft
        const { oldIndex, newIndex } = action.payload
        const currentComponent = componentList[oldIndex]
        const targetPositionComponent = componentList[newIndex]
        // // 交换位置
        componentList[newIndex] = currentComponent
        componentList[oldIndex] = targetPositionComponent
      }
    ),
    //将组件插入到指定位置
    insertComponentReducer: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{
          newIndex: number
          oldIndex: number
        }>
      ) => {
        const { componentList } = draft
        const { oldIndex, newIndex } = action.payload
      
        const currentComponent = componentList[oldIndex]
        componentList.splice(oldIndex, 1)
        componentList.splice(newIndex, 0, currentComponent)
      }
    ),

    //整体下移组件位置
    sortComponentReducer: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<'increase' | 'decrease'>
      ) => {
        const { componentList, selectedId } = draft
        const type = action.payload
        const newComponentList: ComponentInfoType[] = componentList.slice()
        const index = componentList.findIndex(
          (c) => c.component_id === selectedId
        )
        if (index < 0) return
        const recordIndex = {
          isSkip: false,
          index: 0
        }
        /**
         * 0          0
         * 1          1
         * 2 locked   2
         * 3          3
         * 4 locked   4
         * 5          5
         */
        const flag = type === 'increase'
        const progressiveNum = flag ? 1 : -1
        const initObj = {
          i: flag ? 0 : componentList.length - 1,
          limitIndex: flag ? componentList.length : -1,
          progressiveNum
        }
        const flagAry = componentList
          .filter((c) => !c.isLocked)
          .map((c) =>
            componentList.findIndex(
              (component) => component.component_id === c.component_id
            )
          )
        if (flagAry.length === 2) {
          const oldIndex = flagAry[0]
          const newIndex = flagAry[1]
          const currentComponent = componentList[oldIndex]
          const targetPositionComponent = componentList[newIndex]
          // // 交换位置
          componentList[newIndex] = currentComponent
          componentList[oldIndex] = targetPositionComponent
          return
        }
        for (
          let i = initObj.i;
          flag ? i < initObj.limitIndex : i > initObj.limitIndex;
          flag ? i++ : i--
        ) {
          const c = componentList[i]
          if (c.isLocked) continue
          let nextIndex = i + progressiveNum
          if (nextIndex > componentList.length - 1) {
            nextIndex = 0
          }
          if (nextIndex < 0) {
            nextIndex = componentList.length - 1
          }
          const beforeNextComponent = newComponentList[nextIndex]
          if (recordIndex.isSkip) {
            newComponentList[i] = componentList[recordIndex.index]
            recordIndex.isSkip = false
          }
          if (beforeNextComponent.isLocked) {
            recordIndex.isSkip = true
            recordIndex.index = i

            continue
          }
          newComponentList[nextIndex] = c
        }
        draft.componentList = newComponentList
      }
    )
  }
})

export const {
  resetComponentsReducer,
  changeSelectedId,
  addComponent,
  changeComponentReducer,
  deleteSelectedComponentReducer,
  changeComponentHiddenReducer,
  lockedComponentReducer,
  copySelectedComponentReducer,
  pasteCopiedComponentReducer,
  selectPrevComponentReducer,
  selectNextComponentReducer,
  changeComponentTitleReducer,
  moveComponentReducer,
  insertComponentReducer,
  sortComponentReducer
} = componentSlice.actions
export default componentSlice.reducer
