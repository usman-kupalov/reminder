import './Header.css';
import { SelectUser } from '../SelectUser/SelectUser.jsx';
import { Button } from '../Button/Button.jsx';
import { useCallback, useState } from 'react';
import { Logo } from '../Logo/Logo.jsx';

const logos = ['/logo.svg', '/vite.svg'];

export const Header = () => {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = useCallback(() => {
    setLogoIndex(state => Number(!state));
  }, [logoIndex]);

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Toggle Logo</Button>
    </>
  );
};
