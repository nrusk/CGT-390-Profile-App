import { configureStore } from "@reduxjs/toolkit";
import ModeReducer from "./slices/modeSlice";

const store = configureStore({
    reducer: {
        mode: ModeReducer,
    }
})

export default store;