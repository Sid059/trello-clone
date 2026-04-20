import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';

const initialState = {
    byId: {},       // { "board-1": { id: "board-1", title: "Work", listIds: [] } } stores boards by their ID for quick access
    allIds: [],     // ["board-1", "board-2", "board-3"] 
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action) => {
            const id = generateId();
            const newBoard = {
                id,
                title: action.payload.title,
                listIds: [], // Initialze with an empty array of list IDs
                };

                state.byId[id] = newBoard; // Add the new board to the byId object
                state.allIds.push(id); // Add the new board's ID to the allIds array
        },

        deleteBoard: (state, action) => {
            const boardId = action.payload.id;
            delete state.byId[boardId]; // Remove the board from the byId object
            state.allIds = state.allIds.filter( id => id !== boardId); // Remove the board's ID from the allIds array
        },

        updateBoardTitle: (state, action) => {
            const { id, title } = action.payload;
            if (state.byId[id]) {
                state.byId[id].title = title; // Update the title of the specified board
            }
        }
    }
});

export const { addBoard, deleteBoard, updateBoardTitle } = boardsSlice.actions;
export default boardsSlice.reducer;