import { combineReducers, configureStore } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({})

const store = configureStore({
    reducer: rootReducer
})

export default store
