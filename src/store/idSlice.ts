import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IdState {
  value: number
}

const initialState: IdState = {
  value: 0,
}

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = idSlice.actions

export default idSlice.reducer
