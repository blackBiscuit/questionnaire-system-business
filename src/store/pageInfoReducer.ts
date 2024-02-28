import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { QuestionInfo } from '../types/question'
// export interface PageInfoType {
//
//   resetTitle: string
//   title: string
//   desc?: string
//   js?: string
//   css?: string
// }
type OmitName =
  | 'id'
  | 'componentList'
  | 'createAt'
  | 'isStar'
  | 'isDeleted'
// 组件内部使用的标题，当标题为空时，会用内部标题替换，防止标题为空
export type PageInfoType = Omit<QuestionInfo, OmitName> & { resetTitle: string }
const INIT_STATE: PageInfoType = {
  title: '',
  resetTitle: '',
  desc: '',
  js: '',
  css: '',
  answerCount:0
}
export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfoReducer: (
      _draft: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload
    },
    changePageTitleReducer: produce(
      (
        draft: PageInfoType,
        action: PayloadAction<{
          type?: 'change' | 'blur'
          title: string
        }>
      ) => {
        const { title, type = 'change' } = action.payload
        draft.title = title
        if (type === 'blur') {
          draft.resetTitle = title
        }
      }
    )
  }
})
export const { resetPageInfoReducer, changePageTitleReducer } =
  pageInfoSlice.actions
export default pageInfoSlice.reducer
