import {configureStore} from '@reduxjs/toolkit';
import DataSlicer from './DataSlicer';
// To provider actions and states thow app
const store = configureStore({
  reducer: {
    person: DataSlicer,
  },
});
export default store;
