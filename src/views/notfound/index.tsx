import { Link } from "react-router-dom";

import notFoundImg from '../../assets/notfound.svg';

export default function NotfoundView() {
  return (
    <section className="notfound_main">
      <h2>404</h2>
      <h3>Not Found</h3>
      <img src={notFoundImg} alt="잘못된 경로를 알려주는 사진" />
      <Link to='/' replace={true} className='button positive'>메인 페이지로 돌아가기</Link>
    </section>
  )
}