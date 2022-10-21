import { createContext, Dispatch, useEffect, useReducer } from "react";
import { DayDto, Goal, CreateDayDto } from "../service/day.dto";
import getDateDif from "../utils/getDateDif";
import { getToday } from "../utils/getDate";
import dayService from "../service/day.service";

type State = {
  dif: number;
  create: CreateDayDto;
  update: DayDto;
  days: DayDto[];
}

type Action =
  | { type: 'SET_DIF'; dif: number }
  | { type: 'SET_CREATE'; create: CreateDayDto }
  | { type: 'SET_CREATE_DETAIL'; key: keyof CreateDayDto; value: string | Goal }
  | { type: 'SET_UPDATE'; update: DayDto }
  | { type: 'SET_UPDATE_DETAIL'; key: keyof DayDto; value: string | Goal | Date }
  | { type: 'SET_DAYS'; days: DayDto[] }
  | { type: 'RESET' }

export type DaysDispatch = Dispatch<Action>;
export const DaysStateContext = createContext<State | null>(null);
export const DaysDispatchContext = createContext<DaysDispatch | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_DIF':
      return {
        ...state,
        dif: action.dif
      };
    case 'SET_DAYS':
      return {
        ...state,
        days: action.days
      };
    case 'SET_CREATE':
      return {
        ...state,
        create: action.create,
      };
    case 'SET_CREATE_DETAIL':
      return {
        ...state,
        create: {
          ...state.create,
          [action.key]: action.value
        }
      };
    case 'SET_UPDATE':
      return {
        ...state,
        update: action.update,
      };
    case 'SET_UPDATE_DETAIL':
      return {
        ...state,
        update: {
          ...state.update,
          [action.key]: action.value
        }
      };
    case 'RESET':
      return {
        dif: 0,
        create: {
          goal: 'dday',
          emoji: '',
        } as CreateDayDto,
        update: {} as DayDto,
        days: dayService.getAll(),
      }
    default:
      throw new Error('Unknowned action type');
  }
}

export default function DaysContextProvider(
  { children }: { children: React.ReactNode }
) {
  const [state, dispatch] = useReducer(reducer, {
    dif: 0,
    create: {
      goal: 'dday',
      emoji: '',
    } as CreateDayDto,
    update: {} as DayDto,
    days: []
  });

  useEffect(() => {
    dispatch({ type: 'SET_DIF', dif: getDateDif(getToday(), state.create.date) });
  }, [state.create.date]);
  
  useEffect(() => {
    dispatch({ type: 'SET_DIF', dif: getDateDif(getToday(), state.update.date) });
  }, [state.update.date]);

  return (
    <DaysStateContext.Provider value={state}>
      <DaysDispatchContext.Provider value={dispatch}>
        { children }
      </DaysDispatchContext.Provider>
    </DaysStateContext.Provider>
  )
}
