import { useNavigate } from "react-router-dom";
import { DayDto } from "../../service/day.dto";
import { MouseEventHandler, useMemo } from 'react';
import getDateDif from '../../utils/getDateDif';
import { getToday } from '../../utils/getDate';

interface DayItemProps {
  day: DayDto;
  onDelete: MouseEventHandler<HTMLButtonElement>
}

export default function DayItem({ day: { id, name, emoji, updated_on, date, goal }, onDelete } : DayItemProps) {  
  const dif = useMemo(() => {
    return getDateDif(date, getToday());
  }, [date]);

  const day = useMemo(() => {
    return goal === 'dday' ? 'D-' : 'D+';
  }, [goal]);

  const navigate = useNavigate();

  function onClickDayItem(id: string) {
    navigate(`/update/${id}`);
  }
  
  return (
    <li className="day_item" onClick={() => onClickDayItem(id)}>
      <p className="day_item_emoji">{emoji || '📆'}</p>
      <div className="day_item_detail">
        <p className="day_item_detail_dif">{ day }{ dif }</p>
        <p className="day_item_detail_name">{name}</p>
        <p className="day_item_detail_updated_on">
          {new Date(updated_on).toLocaleString()}
        </p>
      </div>
      <button onClick={onDelete}>삭제</button>
    </li>
  );
}