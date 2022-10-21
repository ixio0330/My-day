import { render } from '../../test-utils';
import * as router from 'react-router';
import UpdateView from '../../views/update';

describe('<UpdateView />', () => {
  const navigate = jest.fn();
  const alertSpy = jest.spyOn(window, 'alert');

  it('존재하지 않는 아이디로 진입 시, 경고창을 띄우고 메인 페이지로 이동시킨다.', () => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    render(<UpdateView />);

    expect(alertSpy).toBeCalledWith('존재하지 않는 디데이입니다.');
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });
});