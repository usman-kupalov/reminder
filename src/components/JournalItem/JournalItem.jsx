import './JournalItem.css';
import moment from 'moment';

export const JournalItem = (props) => {
  const { data } = props;
  const { title, date, post } = data;

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">
          {moment(date).format('DD.MM.YYYY')}
        </div>
        <div className="journal-item__text">{post}</div>
      </h2>
    </>
  );
};
