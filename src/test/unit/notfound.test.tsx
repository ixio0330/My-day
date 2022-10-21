import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import NotfoundView from '../../views/notfound';

describe('<NotFoundView />', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('존재하지 않는 페이지에 접속시 보여준다.', () => {
    render(
      <MemoryRouter initialEntries={['/bad-route']}>
        <NotfoundView />
      </MemoryRouter>
    );

    const notFoundEl = screen.getByRole('heading', { level: 3, name: 'Not Found' });
    expect(notFoundEl).toBeInTheDocument();
  });

  it('메인 페이지로 돌아가기 버튼을 누르면 / 경로로 이동시킨다.', async () => {
    render(<NotfoundView />, { wrapper: BrowserRouter });

    const replaceLink = screen.getByRole('link', { name: '메인 페이지로 돌아가기' });

    await userEvent.click(replaceLink);
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });
});