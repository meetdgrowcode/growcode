import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface NavState {
  isOpen: boolean
  activeLink: string
}

const initialState: NavState = {
  isOpen: false,
  activeLink: 'home',
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen
    },
    closeMenu: (state) => {
      state.isOpen = false
    },
    setActiveLink: (state, action: PayloadAction<string>) => {
      state.activeLink = action.payload
    },
  },
})

export const { toggleMenu, closeMenu, setActiveLink } = navSlice.actions
export default navSlice.reducer
