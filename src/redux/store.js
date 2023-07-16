import { configureStore } from '@reduxjs/toolkit';
import { contacts } from './contactSlice';
import { filter } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts,
    filter,
  },
});
