import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentReducer, { ComponentsStateType } from './componentReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
export interface StateType {
  user: UserStateType
  component: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}
const store = configureStore<StateType>({
  reducer: {
    user: userReducer,
    // 没有undo
    // components: componentReducer,
    // 具备undo
    component: undoable(componentReducer, {
      limit: 20, //限制undo 20步
      filter: excludeAction([
        'components/changeSelectedId',
        'components/selectPrevComponentReducer',
        'components/selectNextComponentReducer',
        'components/resetComponents'
      ])
    }),
    pageInfo: pageInfoReducer
  }
})
export default store
