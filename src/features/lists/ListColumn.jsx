import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCardToList } from './listsSlice';
import { addCard } from '../cards/cardsSlice';
import { generateId } from '../../utils/generateId';
import Button from '../../components/reusable/Button';
import Input from '../../components/reusable/Input';
import Card from '../cards/Card';

export default function ListColumn({ list, onDeleteList }) {
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);
    const [newCardTitle, setNewCardTitle] = useState('');

    const getListCards = () => {
        if (!list?.cardIds) return [];
        return list.cardIds.map(cardId => cards.byId[cardId]).filter(Boolean);
    };

    const handleAddCard = () => {
        if (newCardTitle.trim() === '') return;

        const newCardId = generateId();

        dispatch(addCard({
            id: newCardId,
            title: newCardTitle,
            description: '',
            listId: list.id
        }));

        dispatch(addCardToList({
            listId: list.id,
            cardId: newCardId
        }));

        setNewCardTitle('');
    };

    const handleCardInputChange = (e) => {
        setNewCardTitle(e.target.value);
    };

    const handleCardKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddCard();
        }
    };

    const handleDeleteClick = () => {
        onDeleteList(list.id);
    };

    const listCards = getListCards();

    return (
        <div className="bg-[#ebecf0] rounded-lg p-3 min-w-[272px] max-w-[272px]">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    {list.title}
                </h3>
                <Button
                    variant="danger"
                    onClick={handleDeleteClick}
                    className="text-xs px-2 py-1 opacity-0 group-hover/list:opacity-100 transition-opacity"
                    icon="delete"
                >
                </Button>
            </div>

            <div className="min-h-[100px] mb-2">
                {listCards.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                        No cards yet
                    </p>
                ) : (
                    listCards.map(card => (
                        <Card key={card.id} card={card} listId={list.id} />
                    ))
                )}
            </div>
            

            <div className="mt-2 pt-2 border-t border-gray-300">
                <div className="flex gap-2">
                    <Input
                        value={newCardTitle}
                        onChange={handleCardInputChange}
                        onKeyDown={handleCardKeyDown}
                        placeholder="+ Add a card..."
                        className="text-sm bg-transparent border-none shadow-none focus:ring-0 px-2 py-1"
                    />
                    <Button
                        variant="primary"
                        onClick={handleAddCard}
                        className="text-sm px-3 py-1"
                        icon="add"
                    >
                        {/* Add */}
                    </Button>
                </div>
            </div>
        </div>
    );
}