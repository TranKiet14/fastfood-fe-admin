import { createSlice } from "@reduxjs/toolkit";
const foodSlice = createSlice ({
    name: "food",
    initialState: {
        foods: {
            allFoods: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getFoodsStart: (state) => {
            state.foods.isFetching = true
        },
        getFoodsSuccess: (state, action) => {
            state.foods.isFetching = false;
            state.foods.allFoods = action.payload;
            state.foods.error = false
        },
        getFoodsFailed: (state) => {
            state.foods.isFetching = false;
            state.foods.error = true
        },
    }
})
export const {
    getFoodsStart,
    getFoodsSuccess,
    getFoodsFailed
} = foodSlice.actions

export default foodSlice.reducer