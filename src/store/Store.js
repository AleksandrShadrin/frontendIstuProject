import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
	leftPart: [[0]],
	rightPart: [0],
};

const matrixSlice = createSlice({
	name: "matrix",
	initialState,
	reducers: {
		addVariable(state) {
			if (state.rightPart.length > 5) return;
			state.leftPart = [
				...state.leftPart.map((row) => {
					return [...row, 0];
				}),
				Array(state.leftPart.length + 1).fill(0),
			];
			state.rightPart = [...state.rightPart, 0];
		},
		removeVariable(state) {
			if (state.rightPart.length === 1) return;
			state.leftPart = state.leftPart.splice(
				0,
				state.leftPart.length - 1
			);
			state.rightPart = state.rightPart.splice(0, state.leftPart.length);
			state.leftPart = state.leftPart.map((row) =>
				row.splice(0, row.length - 1)
			);
		},
		changeCellValue(state, action) {
			const [x, y] = action.payload.pos;
			const value = action.payload.value;
			if (x === "r") {
				state.rightPart[y] = value;
			} else {
				state.leftPart[x][y] = value;
			}
		},
	},
});

const store = configureStore({
	reducer: {
		matrix: matrixSlice.reducer,
	},
});

export default store;

export const matrixActions = matrixSlice.actions;
