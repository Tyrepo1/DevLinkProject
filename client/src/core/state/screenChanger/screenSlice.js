import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "dashboard",
    profile: null, 
};

const screenSlice = createSlice({
    name: "screen",
    initialState: initialState,
    reducers: {
        changeScreen: (state, action) => {
            const { name, profile } = action.payload;
            return { ...state, value: name || "", profile: profile || null };
        }
    },
});

export const { changeScreen } = screenSlice.actions;

export const selectScreenValue = (state) => state.screenReducer.value;
export const selectProfile = (state) => state.screenReducer.profile;

export default screenSlice.reducer;
