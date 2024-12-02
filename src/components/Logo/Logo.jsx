import styles from './Logo.module.css';

export const Logo = ({ image }) => {
  return (
    <img className={styles.logo} src={image} alt="Logo" />
  );
};