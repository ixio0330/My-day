import { DayDto, CreateDayDto, UpdateDayDto } from './day.dto';
import * as uuid from 'uuid';

class DayService {
  private key = 'APP_DATA';
  private max = 20;

  private saveDays(data: DayDto[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getAll() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) as DayDto[] : [] as DayDto[];
  }

  getSearch(search: string) {
    const days = this.getAll();
    return days.filter(
      (day) => {
        const regex = new RegExp(search, 'gi');
        return day.name.match(regex);
      }
    );
  }

  getById(id: string) {
    const days = this.getAll();
    const find = days.find((day) => day.id === id);
    if (!find) {
      throw new Error('존재하지 않는 디데이입니다.');
    }
    return find;
  }

  create(info: CreateDayDto) {
    const days = this.getAll();
    
    if (this.max <= days.length) {
      throw new Error(`디데이는 최대 ${this.max}개까지 저장 가능합니다.`);
    }

    days.push({
      ...info,
      id: uuid.v1(),
      updated_on: new Date(),
    });
    this.saveDays(days);
  }

  update(id: string, info: UpdateDayDto) {
    const days = this.getAll();
    
    const newDays = days.map((day) => day.id !== id ? day : {
      ...info,
      id,
      updated_on: new Date(),
    });
    this.saveDays(newDays);
  }

  delete(id: string) {
    const days = this.getAll();
    this.getById(id);

    const newDays = days.filter((day) => day.id !== id);
    this.saveDays(newDays);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

const dayService = new DayService();
export default dayService;