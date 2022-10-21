import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getYesterday, getTomorrow } from '../../utils/getDate';

import App from '../../App';

// ! Lazy loading 때문에 페이지 로딩을 위해 처음 선택한 요소는 find로 비동기 처리해줘야한다.

describe('App 통합 테스트 (Integration Test)', () => {
  const confrimSpy = jest.spyOn(window, 'confirm');
  const alertSpy = jest.spyOn(window, 'alert');

  it('저장, 수정, 삭제 통합 테스트', async () => {
    render(<App />);
    const dateInput = await screen.findByLabelText('날짜') as HTMLInputElement;
    const dayEl = screen.getByRole('heading', { level: 3, name: 'D-0일' });
    const goalSelect = screen.getByLabelText('유형');
    const addButton = screen.getByRole('link', { name: '추가' });

    // 목적을 기념일로 변경하고, 날짜를 선택한다.
    await userEvent.selectOptions(goalSelect, 'anniversary');
    expect(dayEl).toHaveTextContent('D+0일');

    await userEvent.type(dateInput, getYesterday());
    expect(dayEl).toHaveTextContent('D+1일');

    // 추가 버튼을 클릭한다.
    await userEvent.click(addButton);
    
    const createViewTitle = await screen.findByText('추가하기');
    expect(createViewTitle).toBeInTheDocument();

    const nameInput = screen.getByRole('textbox', { name: '디데이 이름' }) as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: '저장' });

    // 이름을 작성하고 추가 버튼을 클릭한다.
    await userEvent.type(nameInput, '테스트');
    await userEvent.click(saveButton);

    // 추가된 날짜를 리스트에서 보여준다.
    const daysList = await screen.findAllByRole('listitem');
    expect(daysList.length).toBe(1);
    expect(daysList[0]).toHaveTextContent('테스트');
    
    // 날짜를 선택한다.
    await userEvent.click(daysList[0]);

    const updateViewTitle = await screen.findByText('수정하기');
    expect(updateViewTitle).toBeInTheDocument();

    const updateNameInput = screen.getByRole('textbox', { name: '디데이 이름' }) as HTMLInputElement;
    const updateSaveButton = screen.getByRole('button', { name: '저장' });

    // 이름을 수정하고 저장한다.
    await userEvent.type(updateNameInput, '업데이트 테스트');
    await userEvent.click(updateSaveButton);

    // 수정된 날짜를 리스트에서 보여준다.
    const updateDaysList = await screen.findAllByRole('listitem');
    expect(updateDaysList[0]).toHaveTextContent('업데이트 테스트');

    const deleteButton = screen.getByRole('button', { name: '삭제' });

    // 삭제 버튼을 클릭한다. 취소를 클릭한다.
    confrimSpy.mockImplementation(jest.fn(() => false));
    await userEvent.click(deleteButton);
    expect(confrimSpy).toBeCalled();
    expect(updateDaysList.length).toBe(1);

    // 삭제 버튼을 클릭한다. 확인을 클릭한다.
    confrimSpy.mockImplementation(jest.fn(() => true));
    await userEvent.click(deleteButton);
    expect(confrimSpy).toBeCalled();
    const deleteDaysList = screen.queryByRole('listitem');

    // 빈 리스트를 보여준다.
    expect(deleteDaysList).not.toBeInTheDocument();
  });

  it('20개 이상 저장하려고 할 때, 경고창을 보여주고 저장을 막는다.', async () => {
    render(<App />);
    
    // 날짜를 20개 생성한다.
    for (let i = 1; i <= 20; i++) {
      const dateInput = await screen.findByLabelText('날짜') as HTMLInputElement;
      const addButton = screen.getByRole('link', { name: '추가' });
      await userEvent.type(dateInput, getTomorrow());
      await userEvent.click(addButton);

      const nameInput = await screen.findByRole('textbox', { name: '디데이 이름' }) as HTMLInputElement;
      const saveButton = screen.getByRole('button', { name: '저장' });

      await userEvent.type(nameInput, `테스트 ${i}`);
      await userEvent.click(saveButton);
    }

    const dateInput = await screen.findByLabelText('날짜') as HTMLInputElement;
    const addButton = screen.getByRole('link', { name: '추가' });
    // 날짜를 21개째 생성하려고 하면 경고창을 보여준다.
    await userEvent.type(dateInput, getTomorrow());
    await userEvent.click(addButton);

    const nameInput = await screen.findByRole('textbox', { name: '디데이 이름' }) as HTMLInputElement;
    const saveButton = screen.getByRole('button', { name: '저장' });
    
    await userEvent.type(nameInput, '테스트 21');
    await userEvent.click(saveButton);
    expect(alertSpy).toBeCalledWith('디데이는 최대 20개까지 저장 가능합니다.');
  }, 30000);
});