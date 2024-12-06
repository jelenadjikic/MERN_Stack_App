import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ownerReducer from '../features/owners/ownerSlice';
import propertyReducer from '../features/properties/propertySlice'
import forumReducer from '../features/forum/forumSlice'
import reservationReducer from '../features/reservations/reservationSlice'

export const store = configureStore ({
  reducer: {
    auth: authReducer,
    owners: ownerReducer,
    properties: propertyReducer,
    forum: forumReducer,
    reservations: reservationReducer
  },
});
