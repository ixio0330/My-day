import { CreateDayDto, DayDto } from "../../service/day.dto";

interface DayProps {
  state: CreateDayDto | DayDto | undefined;
  dif: number | undefined;
}

export default function Day({ state, dif }: DayProps) {
  const goal = state?.goal === 'dday' ? 'D-' : 'D+';
  return <h3>{goal}{dif || '0'}일</h3>;
}