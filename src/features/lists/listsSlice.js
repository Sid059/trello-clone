import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../utils/generateId';

const initialState = {
    byId: {},
    allIds: [],
}

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action) => {
            const id = generateId();
            const { title, boardId } = action.payload;

            const newList = {
                id,
                title,
                boardId,
                cardIds: [],
            }

            state.byId[id] = newList;
            state.allIds.push(id);
        },

        deleteList: (state, action) => {
            const listId = action.payload.id;
            delete state.byId[listId];
            state.allIds = state.allIds.filter( id => id !== listId);
        },

        updateListTitle: (state, action) => {
            const { id, title } = action.payload;
            if(state.byId[id]){
                state.byId[id].title = title;
            }
        },

        reorderLists: (state, action) => {
        // Placeholder - will implement later
        }
    }
});

export const { addList, deleteList, updateListTitle, reorderLists } = listsSlice.actions;
export default listsSlice.reducer;