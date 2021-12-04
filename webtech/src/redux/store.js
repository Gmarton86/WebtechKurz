import { configureStore } from '@reduxjs/toolkit'
import level from './level'

export default configureStore({
  reducer: level,
})
