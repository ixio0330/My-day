import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import HomeView from "../../views/home";

describe('<HomeView />', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('사용자가 날짜를 선택하면 날짜를 계산하고 보여준다.', async () => {
    render(<HomeView />);
    const dateInput = screen.getByLabelText('날짜') as HTMLInputElement;
    const dayEl = screen.getByRole('heading', { level: 3, name: 'D-0일' });

    await userEvent.type(dateInput, '2022-10-21');
    expect(dayEl).toHaveTextContent('D-1일');
  });

  it('기념일을 선택하면 D+로 변경된다.', async () => {
    render(<HomeView />);
    const goalSelect = screen.getByLabelText('유형');
    const dayEl = screen.getByRole('heading', { level: 3, name: 'D-0일' });

    await userEvent.selectOptions(goalSelect, 'anniversary');
    expect(dayEl).toHaveTextContent('D+0일');
  });

  it('추가 버튼을 누르면 /create 경로로 이동시킨다.', async () => {
    render(<HomeView />);
    const addButton = screen.getByRole('link', { name: '추가' });

    await userEvent.click(addButton);
    expect(navigate).toHaveBeenCalledWith(
      '/create',
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined
      }
    );
  });
});