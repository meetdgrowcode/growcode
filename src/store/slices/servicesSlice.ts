import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

interface ServicesState {
  services: Service[]
  selectedService: Service | null
}

const initialState: ServicesState = {
  services: [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: 'Code2',
      features: ['React', 'Vue.js', 'Next.js', 'Full Stack Development'],
    },
    {
      id: 2,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile solutions',
      icon: 'Smartphone',
      features: ['iOS', 'Android', 'React Native', 'Flutter'],
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: 'Cloud',
      features: ['AWS', 'Azure', 'DevOps', 'Docker & Kubernetes'],
    },
    {
      id: 4,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by cutting-edge AI',
      icon: 'Cpu',
      features: ['Deep Learning', 'NLP', 'Computer Vision', 'Data Analytics'],
    },
  ],
  selectedService: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    selectService: (state, action: PayloadAction<number>) => {
      state.selectedService =
        state.services.find((s) => s.id === action.payload) || null
    },
    clearSelectedService: (state) => {
      state.selectedService = null
    },
  },
})

export const { selectService, clearSelectedService } = servicesSlice.actions
export default servicesSlice.reducer
