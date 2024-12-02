import styles from './JournalForm.module.css';
import { Button } from '../Button/Button.jsx';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';
import { Input } from '../Input/Input.jsx';
import cn from 'classnames';
import { UserContext } from '../../context/UserContext.jsx';

export const JournalForm = ({ onSubmit, data }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.post || !isValid.title || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

  const onChange = (event) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [event.target.name]: event.target.value } });
  };

  const addNote = (event) => {
    event.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addNote}>
      <div className={styles['form-row']}>
        <Input
          appearance={'title'}
          type="text"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          name={'title'}
          isValid={!isValid.title}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor={'date'} className={styles['form-label']}>
          <img src={'/calendar.svg'} alt={'icon calendar'} />
          <span>Date</span>
        </label>
        <Input
          type="date"
          ref={dateRef}
          onChange={onChange}
          name={'date'}
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          id={'date'}
          isValid={!isValid.date}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor={'tag'} className={styles['form-label']}>
          <img src={'/folder.svg'} alt={'icon folder'} />
          <span>Tags</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          id={'tag'}
          value={values.tag}
          name={'tag'}
        />
      </div>

      <textarea
        ref={postRef}
        name={'post'}
        id={''}
        onChange={onChange}
        value={values.post}
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
      ></textarea>
      <Button>Save</Button>
    </form>
  );
};


