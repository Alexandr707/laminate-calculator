import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import st from 'styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: ReactNode;
  label?: string;
}
type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { description, label } = props;

  return (
    <div className={st.input}>
      {!!label && <div className={st.label}>{label}</div>}

      <input ref={ref} {...props} type={props.type || 'text'} />

      {!!description && <div className={st.description}>{description}</div>}
    </div>
  );
});

export default Input;
