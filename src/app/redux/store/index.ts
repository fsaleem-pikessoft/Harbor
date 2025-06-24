import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/redux/store/slices/counterSlice';
import roleReducer from '@/app/redux/store/slices/roleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    role: roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
