import { } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit/dist/configureStore';

export const store = configureStore({
    reducer: {

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;