import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

export const Input = forwardRef(({ isValid, appearance = 'text', className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(className, {
        [styles['invalid']]: isValid,
        [styles['input-title']]: appearance === 'title',
        [styles['input']]: appearance === 'text'
      })} {...props} />
  );
});