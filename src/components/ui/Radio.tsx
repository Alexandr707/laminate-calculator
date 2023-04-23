import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import st from 'styles/Radio.module.css';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  id: string;
  label: string;
}

const Radio: FC<PropsWithChildren<RadioProps>> = ({
  id,
  label,
  name,
  value,
  ...props
}) => {
  return (
    <div className={st.radio}>
      <input {...props} type='radio' name={name} id={id} value={value} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radio;
