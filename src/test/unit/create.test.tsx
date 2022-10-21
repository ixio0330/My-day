import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import CreateView from '../../views/create';
import dayService from '../../service/day.service';
import { getTomorrow } from '../../utils/getDate';

describe('<CreateView />', () => {
  const navigate = jest.fn();
  dayService.create = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('날짜나 제목이 빈 값이 아닐 경우에만 저장 버튼이 활성화된다.', async () => {
    render(<CreateView />);

    const dateInput = screen.getByLabelText('날짜');
    const nameInput = screen.getByRole('textbox', { name: '디데이 이름' });
    const saveButton = screen.getByRole('button', { name: '저장' });
    const dayEl = screen.getByRole('heading', { level: 3, name: 'D-0일' });

    await userEvent.type(dateInput, getTomorrow());
    expect(dayEl).toHaveTextContent('D-1일');
    expect(saveButton).toBeDisabled();

    await userEvent.type(nameInput, '테스트');
    expect(saveButton).toBeEnabled();
  });

  it('날짜와 제목을 입력하고 저장 버튼을 누르면 / 경로로 이동한다.', async () => {
    render(<CreateView />);

    const dateInput = screen.getByLabelText('날짜') as HTMLInputElement;
    const nameInput = screen.getByRole('textbox', { name: '디데이 이름' }) as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: '저장' });

    await userEvent.type(nameInput, '테스트');
    await userEvent.type(dateInput, getTomorrow());
    await userEvent.click(saveButton);
    expect(dayService.create).toHaveBeenCalledWith({
      name: '테스트',
      date: getTomorrow(),
      emoji: '',
      goal: 'dday'
    });
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });
});