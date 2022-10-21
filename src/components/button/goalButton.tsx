import { MouseEventHandler } from 'react';

interface GoalButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function GoalButton({ onClick }: GoalButtonProps) {
  return (
    <div>
      <button onClick={onClick} name='dday' title='디데이입니다.'>디데이</button>
      <button onClick={onClick} name='anniversary' title='기념일입니다.'>기념일</button>
    </div>
  )
}