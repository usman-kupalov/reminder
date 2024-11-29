import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';

export const Input = forwardRef(({ className, isValid = true, appearance, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(className, styles['input'], {
        [styles['invalid']]: !isValid,
        [styles['input-valid']]: appearance === 'title'
      })} />
  );
});