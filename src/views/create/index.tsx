import { useNavigate, Link } from 'react-router-dom';
import { useContext, ChangeEvent } from "react";
import { Helmet } from 'react-helmet-async';

import Day from "../../components/base/day";
import GoalSelect from "../../components/form/goalSelect";
import InputText from "../../components/form/inputText";
import InputDate from "../../components/form/inputDate";

import dayService from "../../service/day.service";
import { DaysStateContext, DaysDispatchContext, DaysDispatch } from "../../context/days";
import { Goal } from '../../service/day.dto';

import createImg from '../../assets/light-create.svg';

export default function CreateView() {
  const state = useContext(DaysStateContext);
  const dispatch = useContext(DaysDispatchContext) as DaysDispatch;
  const navigate = useNavigate();
  const create = state?.create;

  function onClickSave() {
    try {
      dayService.create({
        name: create?.name as string,
        emoji: create?.emoji as string,
        date: create?.date as string,
        goal: create?.goal as Goal
      });
      dispatch({ type: 'RESET' });
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
        return;
      }
      console.log(error);
    }
  }

  function onChangeGoal(e: ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: 'SET_CREATE_DETAIL', key: 'goal', value: e.target.value as Goal });
    dispatch({ type: 'SET_CREATE_DETAIL', key: 'date', value: '' });
  }

  function buttonDisabled() {
    if (!create?.name || !create?.date) {
      return true;
    }
    return false;
  }

  return (
    <>
      <Helmet>
        <title>My-day 마이데이 추가하기</title>
      </Helmet>
      <section className='action_main'>
        <div className='action_img'>
          <img src={createImg} alt="로켓 사진" />
        </div>
        <div className='action_content'>
          <h2>추가하기</h2>
          <Day dif={state?.dif} state={state?.create} />
          <GoalSelect onChange={onChangeGoal} id='create_goal_select' />
          <InputDate
            label="날짜"
            value={create?.date || ''}
            onChange={(e) => dispatch({ type: 'SET_CREATE_DETAIL', key: 'date', value: e.target.value })}
            goal={create?.goal}
          />
          <InputText
            label='디데이 이름'
            value={create?.name || ''}
            onChange={(e) => dispatch({ type: 'SET_CREATE_DETAIL', key: 'name', value: e.target.value })}
            maxLength={20}
          />
          <div className="btn_wrap">
            <button onClick={onClickSave} disabled={buttonDisabled()} className='button positive'>저장</button>
            <Link to='/' className='button negative'>취소</Link>
          </div>
        </div>
      </section>
    </>
  )
}