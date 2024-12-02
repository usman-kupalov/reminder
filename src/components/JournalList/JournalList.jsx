import './JournalList.css';
import { CardButton } from '../CardButton/CardButton.jsx';
import { JournalItem } from '../JournalItem/JournalItem.jsx';
import { UserContext } from '../../context/UserContext.jsx';
import { useContext, useMemo } from 'react';
import { sortItems } from '../../utils/sorting.js';

export const JournalList = ({ items, setItem }) => {
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>No recording</p>;
  }

  const filteredItems = useMemo(() =>
    items.filter((el) => el.userId === userId)
      .sort(sortItems), [items, userId]);

  return (
    <>
      {filteredItems
        .map((el) => (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <JournalItem data={el} />
          </CardButton>
        ))}
    </>
  );

};

