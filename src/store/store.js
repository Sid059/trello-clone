import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import boardsReducer from '../features/boards/boardsSlice';
//import listsReducer from '../features/lists/listsSlice';    //later to be worked

const rootReducer = combineReducers({
    boards: boardsReducer
    //lists: listsReducer, //later to be worked
});

const persistConfig = {
    key: 'trello-root',
    storage,
    whitelist: ['boards'],       //only boards for now
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'] // Ignore these actions for serializability check
            }
        })
    )
})

export const persistor = persistStore(store);