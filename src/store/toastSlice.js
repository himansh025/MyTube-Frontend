import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    actionName:null,
    itemName:null
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        makeToast:(state,action)=>{
            const { actionName , itemName } = action.payload;
            state.status = true,
            state.actionName = actionName,
            state.itemName = itemName
        },
        removeToast:(state)=>{
            state.status = false,
            state.actionName = null,
            state.itemName = null
        }
    },
})
export const { makeToast, removeToast } = toastSlice.actions
export default toastSlice.reducer