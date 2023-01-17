import { createSlice } from '@reduxjs/toolkit'

const initialState = {text: "", timeoutID: null}

const notifSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotif(state, action) {
            clearTimeout(state.timeoutID)
            return action.payload
        },
        deleteNotif(state, action) {
            return ""
        }
    }
})

const { setNotif, deleteNotif } = notifSlice.actions

export const displayNotif = (text, seconds) => {
    return (dispatch) => {
        const timeoutID = setTimeout(() => {
            dispatch(deleteNotif())
        }, seconds * 1000)

        dispatch(setNotif({ text, timeoutID }))
    }
}

export default notifSlice.reducer