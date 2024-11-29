import { UserContext } from '../../context/UserContext.jsx';
import { useContext } from 'react';

export const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select name={'user'} id={'user'} value={userId} onChange={changeUser}>
      <option value="1">Usman</option>
      <option value="2">Nodir</option>
    </select>
  );
};