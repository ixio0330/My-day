import { ChangeEventHandler } from 'react';
import { getTomorrow, getYesterday } from '../../utils/getDate';
import * as uuid from 'uuid';
import { Goal } from '../../service/day.dto';

interface InputDateProps {
  id?: string;
  label?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  goal?: Goal
}

export default function InputDate({ id = uuid.v1(), label, value, onChange, goal }: InputDateProps) {
  const min = goal === 'dday' ? getTomorrow() : undefined;
  const max = goal === 'anniversary' ? getYesterday() : undefined;

  return (
    <div className='input_wrap'>
      <label htmlFor={id}>{ label }</label>
      <input type="date" name={id} id={id} value={value} onChange={onChange} min={min} max={max} />
    </div>
  )
}