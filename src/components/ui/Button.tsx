import { ButtonHTMLAttributes, forwardRef } from 'react';
import st from 'styles/Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={`${props.className || ''} ${st.btn}`}
    >
      {children}
    </button>
  );
});

export default Button;
