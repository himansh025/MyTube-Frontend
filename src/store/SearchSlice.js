import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    query:null
}

export const searchSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        giveQuery:(state,action)=>{
            const { query  } = action.payload;
            state.query = query
        },
        removeQuery:(state)=>{
            state.query = null
        }
    },
})
export const { giveQuery, removeQuery } = searchSlice.actions
export default searchSlice.reducer