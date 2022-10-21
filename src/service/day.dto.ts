export interface DayDto extends CreateDayDto, UpdateDayDto {
  updated_on: Date;
  id: string;
}

export interface CreateDayDto {
  name: string;
  date: string;
  emoji: string;
  goal: Goal;
}

export interface UpdateDayDto extends CreateDayDto {
}

export type Goal = "dday" | "anniversary";
