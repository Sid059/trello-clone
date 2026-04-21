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
        <div className="bg-gray-200 rounded-lg p-4 min-w-[280px] max-w-[280px]">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800">
                    {list.title}
                </h3>
                <Button
                    variant="danger"
                    onClick={handleDeleteClick}
                    className="text-sm px-2 py-1"
                >
                    Delete
                </Button>
            </div>

            <div className="min-h-[100px] mb-3">
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

            <div className="flex gap-2 mt-2">
                <Input
                    value={newCardTitle}
                    onChange={handleCardInputChange}
                    onKeyDown={handleCardKeyDown}
                    placeholder="+ Add a card..."
                    className="text-sm"
                />
                <Button
                    variant="primary"
                    onClick={handleAddCard}
                    className="text-sm px-3 py-1"
                >
                    Add
                </Button>
            </div>
        </div>
    );
}