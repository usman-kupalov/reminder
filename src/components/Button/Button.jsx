import './Button.css';

export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button accent">
      {children}
    </button>
  );
};
