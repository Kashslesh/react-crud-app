import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isRender: false,
};
// isRender boolean for control a Requaste API if true make one
const personsSlicer = createSlice({
  name: 'List of persons',
  initialState,
  reducers: {
    loseStatus(state) {
      state.isRender = false;
    },
    getStatus(state) {
      state.isRender = true;
    },
  },
});
export const personsActions = personsSlicer.actions;
export default personsSlicer.reducer;
