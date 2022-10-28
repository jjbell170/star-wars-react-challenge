import { configureStore } from '@reduxjs/toolkit'

import StarWarsAPI from './api/StarWarsAPI'

const store = configureStore({
  reducer: {
    [StarWarsAPI.reducerPath]: StarWarsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(StarWarsAPI.middleware),
})

export default store
