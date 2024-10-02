import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
data:[]
}

export const dataslicer = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getdata:(state,action)=>{
            
            const { data } = action.payload;
            state.status = true,
            state.data = data
        }
       
    },
})
export const { getdata } = dataslicer.actions
export default dataslicer.reducer
