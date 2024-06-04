import { createSlice } from '@reduxjs/toolkit'

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        userName: ''
    },
    reducers: {
        setUserName(state, { payload }) {
            state.userName = payload
        }
    }
})

export const { setUserName } = userInfo.actions

export default userInfo
