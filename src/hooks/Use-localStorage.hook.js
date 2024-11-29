import { useEffect, useState } from 'react';

export const useLocalStorage = (key) => {
  const [data, setData] = useState(() => {
    const saveData = localStorage.getItem(key);
    return saveData ? JSON.parse(saveData) : [];
  });

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res) {
      setData(res);
    }
  }, [key]);

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
};