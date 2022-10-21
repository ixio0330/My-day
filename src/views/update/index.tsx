import { useEffect, useContext, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import dayService from "../../service/day.service";
import { DaysStateContext, DaysDispatchContext, DaysDispatch } from "../../context/days";

import Day from "../../components/base/day";
import GoalSelect from "../../components/form/goalSelect";
import InputDate from "../../components/form/inputDate";
import InputText from "../../components/form/inputText";
import { Goal } from "../../service/day.dto";

import updateImg from '../../assets/light-update.svg';

export default function UpdateView() {
  const { id } = useParams();
  const state = useContext(DaysStateContext);
  const dispatch = useContext(DaysDispatchContext) as DaysDispatch;
  const navigate = useNavigate();
  const update = state?.update;
  
  useEffect(() => {
    try {
      dispatch({ type: 'SET_UPDATE', update: dayService.getById(id as string) });
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
        navigate('/', { replace: true });
        return;
      }
      console.log(error);
    }
  }, [id, dispatch, navigate]);

  function onClickUpdate() {
    try {
      dayService.update(id as string, {
        name: update?.name as string,
        emoji: update?.emoji as string,
        date: update?.date as string,
        goal: update?.goal as Goal
      });
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
    dispatch({ type: 'SET_UPDATE_DETAIL', key: 'goal', value: e.target.value as Goal });
    dispatch({ type: 'SET_UPDATE_DETAIL', key: 'date', value: '' });
  }

  function buttonDisabled() {
    if (!update?.name || !update?.date) {
      return true;
    }
    return false;
  }

  return (
    <>
      <Helmet>
        <title>My-day 마이데이 수정하기</title>
      </Helmet>
      <section className='action_main'>
        <div className='action_img'>
          <img src={updateImg} alt="폴라로이드 필름 사진" />
        </div>
        <div className="action_content">
          <h2>수정하기</h2>
          <Day dif={state?.dif} state={state?.update} />
          <GoalSelect onChange={onChangeGoal} id='update_goal_select' />
          <InputDate
            label="날짜"
            value={update?.date || ''}
            onChange={(e) => dispatch({ type: 'SET_UPDATE_DETAIL', key: 'date', value: e.target.value })}
            goal={update?.goal}
          />
          <InputText
            label='디데이 이름'
            value={update?.name || ''}
            onChange={(e) => dispatch({ type: 'SET_UPDATE_DETAIL', key: 'name', value: e.target.value})}
            maxLength={20}
          />
          <div className="btn_wrap">
            <button onClick={onClickUpdate} disabled={buttonDisabled()} className='button positive'>저장</button>
            <Link to='/' className='button negative'>취소</Link>
          </div>
        </div>
      </section>
    </>
  );
}