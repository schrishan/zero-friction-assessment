import { configureStore } from '@reduxjs/toolkit';
import organizationConfigReducer from './slices/organizationConfigSlice';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
  reducer: {
    organizationConfig: organizationConfigReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
