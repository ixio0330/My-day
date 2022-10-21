import { useContext, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DaysStateContext, DaysDispatchContext, DaysDispatch } from "../../context/days";

import Day from "../../components/base/day";
import GoalSelect from "../../components/form/goalSelect";
import InputDate from "../../components/form/inputDate";
import DayList from "../../components/home/dayList";
import InputSearch from "../../components/form/inputSearch";

import { Goal } from "../../service/day.dto";

import dayService from "../../service/day.service";

import mainImg from '../../assets/main.svg';

export default function HomeView() {
  const state = useContext(DaysStateContext);
  const dispatch = useContext(DaysDispatchContext) as DaysDispatch;

  function onChangeGoal(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: 'SET_CREATE_DETAIL', key: 'goal', value: e.target.value as Goal });
    dispatch({ type: 'SET_CREATE_DETAIL', key: 'date', value: '' });
  }

  function onSearch(search: string) {
    if (search === '') {
      dispatch({ type: 'SET_DAYS', days: dayService.getAll() });
      return;
    }

    dispatch({ type: 'SET_DAYS', days: dayService.getSearch(search) });
  }

  function onClickReset() {
    dispatch({ type: 'RESET' });
  }

  function onClickClear() {
    if (window.confirm('확인을 누르면 전체 삭제됩니다.')) {
      dayService.clear();
      dispatch({ type: 'RESET' });
    }
  }

  return (
    <>
      <Helmet>
        <title>My-day 마이데이</title>
      </Helmet>
      <section className="home_main">
        <h2><b>날짜</b>를 <b>편리</b>하게 계산하고<br /> 로그인 없이 <b>저장</b>까지</h2>
        <div className="home_main_image">
          <img src={mainImg} alt="컴퓨터 파일 저장하는 사진" />
        </div>
        <div className="home_main_content">
          <Day dif={state?.dif} state={state?.create} />
          <GoalSelect onChange={onChangeGoal} id='home_goal_select' />
          <InputDate
            label="날짜"
            value={state?.create.date || ''}
            onChange={(e) => dispatch({ type: 'SET_CREATE_DETAIL', key: 'date', value: e.target.value })}
            goal={state?.create.goal}
          />
          <div className="btn_wrap">
            <Link to='/create' className='button positive'>추가</Link>
            <button onClick={onClickReset} className='button negative'>초기화</button>
          </div>
        </div>
      </section>
      <section className="home_list">
        <div className="home_list_wrap">
          <div className="list_action_wrap">
            <InputSearch onSearch={onSearch} />
            <div className="btn_wrap">
              <button className="button negative" onClick={onClickClear}>전체삭제</button>
              <Link to='/create' className="button positive">추가</Link>
            </div>
          </div>
          <DayList />
        </div>
      </section>
    </>
  );
}