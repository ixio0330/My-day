import { ChangeEventHandler } from 'react';
import * as uuid from 'uuid';

interface GoalSelectProps {
  id?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export default function GoalSelect({ id = uuid.v1(), onChange }: GoalSelectProps) {
  return (
    <div className='input_wrap'>
      <label htmlFor={id}>유형</label>
      <select name={id} id={id} onChange={onChange}>
        <option value="dday">디데이</option>
        <option value="anniversary">기념일</option>
      </select>
    </div>
  )
}