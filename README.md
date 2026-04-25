# TaskFlow 
### A Trello-style Kanban Board Application

Built to master Redux state management in a real-world application context.

---

## Description

TaskFlow is a full-featured project management application that allows users to organize tasks using boards, lists, and cards — inspired by Trello's project management approach.

---

## Live Demo

**[View Live Demo on Netlify](https://visiboard.netlify.app/)**

---

## Features

| Feature | Description |
|---|---|
| **Board Management** | Create, delete, and rename boards. Each board has its own dashboard view. |
| **List Management** | Add, delete, and rename lists (columns) within any board. Lists represent workflow stages. |
| **Card Management** | Create, delete, and edit cards within lists. Each card has a title and description. |
| **Card Modal** | Click any card to open a modal for editing title and description in one place. |
| **Move Cards** | Dropdown menu to move cards between any lists in the same board. |
| **Data Persistence** | All boards, lists, and cards automatically save to localStorage and persist across page refreshes. |
| **Responsive Grid** | Responsive layout for dashboard and horizontal scrolling for lists on board page. |

---

## Technologies

| Technology | Purpose |
|---|---|
| **React 19** | UI framework for building component-based user interface |
| **Redux Toolkit (RTK)** | State management for boards, lists, and cards with `createSlice` and normalized state |
| **React-Redux** | Connecting React components to Redux store with `useSelector` and `useDispatch` |
| **Redux-Persist** | Auto-saving Redux state to localStorage and rehydrating on app load |
| **React Router DOM** | Client-side routing for Dashboard (`/`) and individual boards (`/board/:boardId`) |
| **Tailwind CSS v4** | Utility-first CSS for styling with custom Trello-like colors |
| **UUID** | Generating unique IDs for boards, lists, and cards |

---

## Project Structure

```
src/
├── features/
│   ├── boards/
│   │   └── boardsSlice.js          # Board state + reducers
│   ├── lists/
│   │   ├── listsSlice.js           # List state + reducers
│   │   └── ListColumn.jsx          # List component with cards
│   └── cards/
│       ├── cardsSlice.js           # Card state + reducers
│       ├── Card.jsx                # Card component
│       ├── CardModal.jsx           # Modal for editing cards
│       └── MoveCardDropdown.jsx    # Dropdown for moving cards
├── components/
│   └── reusable/
│       ├── Button.jsx              # Reusable button with variants
│       ├── Input.jsx               # Reusable input field
│       └── Modal.jsx               # Reusable modal component
├── pages/
│   ├── Dashboard.jsx               # All boards view
│   └── BoardPage.jsx               # Single board view with lists/cards
├── store/
│   └── store.js                    # Redux store + persist configuration
├── utils/
│   └── generateId.js               # UUID wrapper for consistent ID generation
├── App.jsx                         # Main app with routing
├── main.jsx                        # Entry point with Redux Provider + PersistGate
├── router.jsx                      # React Router configuration
└── index.css                       # Tailwind imports + global styles
```

---

## Key Technical Decisions

### Normalized State Structure
```js
// Example of normalized state for boards
boards: {
    byId: { "board-1": { id, title, listIds: [] } },
    allIds: ["board-1"]
}
```
**Why:** Allows O(1) lookups by ID and maintains order separately. Avoids deeply nested state updates.

### Two-Dispatch Pattern
When adding a list, two dispatches keep slices decoupled:
```js
dispatch(addList({ id, title, boardId }));      // Creates list object in listsSlice
dispatch(addListToBoard({ boardId, listId }));  // Links list ID to board in boardsSlice
```
**Why:** Each slice reducer only modifies its own state — no circular dependencies.

### Redux-Persist Configuration
```js
const persistConfig = {
    key: 'trello-root',
    storage,
    whitelist: ['boards', 'lists', 'cards']
};
```
**Why:** Whitelist ensures only the specified reducers persist to localStorage, keeping the store lean.

---

## Installation & Setup

```bash
# Clone repository
git clone https://github.com/yourusername/taskflow.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## What I Learned

- **Redux Toolkit (RTK)** — Creating slices with `createSlice`, managing normalized state with `byId` and `allIds` patterns
- **Redux-Persist** — Implementing automatic localStorage persistence without a backend
- **Normalized State** — Managing relationships between boards, lists, and cards using bidirectional linking
- **Redux DevTools** — Debugging state changes and understanding action flow
- **React Router** — Dynamic routing for individual board pages (`/board/:boardId`)
- **Component Composition** — Building reusable components (`Modal`, `Button`, `Input`) and feature-specific components
- **Two-Dispatch Pattern** — Updating multiple slices when adding/deleting related data

---

## Acknowledgments

Inspired by [Trello's](https://trello.com) project management approach. Built for learning Redux Toolkit and advanced state management patterns.