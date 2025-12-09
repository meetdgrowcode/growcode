import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice'
import servicesReducer from './slices/servicesSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    services: servicesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
