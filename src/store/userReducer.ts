import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo } from '../types/user'
export type UserStateType = UserInfo
const INIT_STATE: UserStateType = {
  email: '',
  username: ''
}
export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      _state: UserStateType,
      action: PayloadAction<UserStateType>
    ) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  }
})

export const { loginReducer, logoutReducer, } = userSlice.actions
export default userSlice.reducer
