import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
export interface PageInfoType {
  resetTitle: string
  title: string
  desc?: string
  js?: string
  css?: string
}
const INIT_STATE: PageInfoType = {
  title: '',
  resetTitle: '',
  desc: '',
  js: '',
  css: ''
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
