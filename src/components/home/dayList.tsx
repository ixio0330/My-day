import DayItem from './dayItem';
import { useContext, useEffect, MouseEvent } from 'react';
import { DaysStateContext, DaysDispatchContext, DaysDispatch } from '../../context/days';
import dayService from '../../service/day.service';

export default function DayList() {
  const state = useContext(DaysStateContext);
  const dispatch = useContext(DaysDispatchContext) as DaysDispatch;
  useEffect(() => {
    dispatch({ type: 'SET_DAYS', days: dayService.getAll() });
    dispatch({ type: 'RESET' });
  }, [ dispatch ]);

  function onDelete(e: MouseEvent, id: string) {
    e.stopPropagation();
    if(window.confirm('확인을 누르면 삭제됩니다.')) {
      dayService.delete(id);
      dispatch({ type: 'SET_DAYS', days: dayService.getAll() });
    }
  }

  const list = state?.days?.map((day) => <DayItem key={day.id} day={day} onDelete={(e) => onDelete(e, day.id)} />);
  return (
    <ul className='day_list'>
      { list }
    </ul>
  )
}