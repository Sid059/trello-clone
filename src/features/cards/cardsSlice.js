import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    byId: {},
    allIds: []
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { id, title, description, listId } = action.payload;

            const newCard = {
                id,
                title,
                description,
                listId
            };

            state.byId[id] = newCard;
            state.allIds.push(id);
        },

        deleteCard: (state, action) => {
            const cardId = action.payload.id;
            delete state.byId[cardId];
            state.allIds = state.allIds.filter(id => id !== cardId);
        },

        updateCardTitle: (state, action) => {
            const { id, title } = action.payload;
            if(state.byId[id]){
                state.byId[id].title = title;
            }
        },

        updateCardDescription: (state, action) => {
            const { id, description } = action.payload;
            if(state.byId[id]){
                state.byId[id].description = description;
            }
        },

        moveCardToList: (state, action) => {
            const { cardId, newListId } = action.payload;
            if(state.byId[cardId]) {
                state.byId[cardId].listId = newListId;
            }
        }
    }
})

export const { addCard, deleteCard, updateCardTitle, updateCardDescription, moveCardToList } = cardsSlice.actions;
export default cardsSlice.reducer;