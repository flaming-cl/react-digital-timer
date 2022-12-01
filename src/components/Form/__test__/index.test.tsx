import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../index';
import { TIME_LABELS } from '../../../constants';
import { getDigitInputIdentifier} from '../../../utils';

describe("<Form />", () => {
  const pauseOrResumeTimer = jest.fn();
  const resetTimer = jest.fn();
  const onInputChange = jest.fn();

  beforeEach(() => {
    const time = {
      hour: 0,
      minute: 0,
      second: 10
    }

    render(
      <Form
        time={time}
        pauseOrResumeTimer={pauseOrResumeTimer}
        resetTimer={resetTimer}
        onInputChange={onInputChange}
      />
    );
  });

  // ------- rendered successfully
  it("renders all digit inputs", () => {
    TIME_LABELS.forEach((label: string) => {
      expect(screen.getByTestId(getDigitInputIdentifier(label))).toBeInTheDocument();
    })
  });

  // ------- keyboard events
  it("fires count down when type enter", async () => {
    userEvent.type(screen.getByTestId(getDigitInputIdentifier('second')), '{enter}')
    expect(pauseOrResumeTimer).toHaveBeenCalledTimes(1);
  });

  it("fires reset timer when type meta/ctrl + enter", async () => {
    await act(() => {
      userEvent.type(screen.getByTestId(getDigitInputIdentifier('second')), '{meta}{enter}')
    })
    expect(resetTimer).toHaveBeenCalledTimes(1);
  });

  it("goes to prev digit when press arrow left", async () => {
    userEvent.type(screen.getByTestId(getDigitInputIdentifier('second')), '{arrowleft}')
    expect(screen.getByTestId(getDigitInputIdentifier('minute'))).toHaveFocus();
  });

  it("goes to next digit when press arrow right", async () => {
    userEvent.type(screen.getByTestId(getDigitInputIdentifier('minute')), '{arrowright}')
    expect(screen.getByTestId(getDigitInputIdentifier('second'))).toHaveFocus();
  });
})
