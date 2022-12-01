import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Timer from '../timer';
import { getDigitInputIdentifier } from '../utils';

describe("<Timer />", () => {
  jest.useFakeTimers();

  const SECONDS = 3720;

  const INIT_TIME = {
    hour: 0,
    minute: 0,
    second: SECONDS
  }

  const onComplete = jest.fn()
  const onTick = jest.fn();

  beforeEach(() => {
    render(
      <Timer
        countDownTime={INIT_TIME}
        onComplete={onComplete}
        onTick={onTick}
      />
    );
  });

  // ------- render time numbers correctly
  it("renders custom value for all digit inputs correctly", () => {
    expect(screen.getByTestId(getDigitInputIdentifier('hour'))).toHaveValue('01');
    expect(screen.getByTestId(getDigitInputIdentifier('minute'))).toHaveValue('02');
    expect(screen.getByTestId(getDigitInputIdentifier('second'))).toHaveValue('');
  });

  // ------- custom callbacks
  it("triggers the onComplete callback when finished counting down", async () => {
    await act(() => {
      userEvent.type(screen.getByTestId(getDigitInputIdentifier('second')), "{enter}");
      jest.runAllTimers();
    });
    expect(onComplete).toBeCalledTimes(1);
  });

  it("triggers the onTick callback when counting down", async () => {
    await act(() => {
      userEvent.type(screen.getByTestId(getDigitInputIdentifier('second')), "{enter}");
      jest.runAllTimers();
    });
    expect(onTick).toBeCalledTimes(SECONDS);
  });

  // ------- input form
  it("updates count down value after reset and type in value", async () => {
    const secondInput = screen.getByTestId(getDigitInputIdentifier('second'));
    await act(() => {
      userEvent.type(secondInput, '{meta}{enter}');
      userEvent.type(secondInput, '1');
    })
    expect(secondInput).toHaveValue('01');
  });

  // ------- control panel buttons
  it("hides timer when click on the hide button", () => {
    const timerForm = screen.getByTestId('timer-form');
    userEvent.click(screen.getByAltText('hide-timer'));
    expect(timerForm).not.toBeInTheDocument();
  });

  it("pauses/resumes timer when click on the pause-resume button", () => {
    const pauseResumeButton = screen.getByAltText('pause-resume');
    userEvent.click(pauseResumeButton);
    expect(onTick).not.toBeCalled();
    userEvent.click(pauseResumeButton);
    expect(onTick).toBeCalled();
  });

  it("resets timer when click on the reset button", () => {
    userEvent.click(screen.getByAltText('reset'));
    expect(screen.getByTestId(getDigitInputIdentifier('hour'))).toHaveValue('01');
    expect(screen.getByTestId(getDigitInputIdentifier('minute'))).toHaveValue('02');
    expect(screen.getByTestId(getDigitInputIdentifier('second'))).toHaveValue('');
  });
})
