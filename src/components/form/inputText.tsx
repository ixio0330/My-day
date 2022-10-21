import { ChangeEventHandler } from 'react';
import * as uuid from 'uuid';

interface InputDateProps {
  id?: string;
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
}

export default function InputText({ id = uuid.v1(), label, value, onChange, maxLength }: InputDateProps) {
  return (
    <div className='input_wrap'>
      <label htmlFor={id}>{ label }</label>
      <input type="text" name={id} id={id} value={value} onChange={onChange} maxLength={maxLength} />
    </div>
  )
}