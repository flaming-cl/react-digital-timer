import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlPanel from '../index';

describe("<ControlPanel />", () => {
  const pauseOrResumeTimer = jest.fn();
  const resetTimer = jest.fn();
  const setShowTimer = jest.fn();
  const countdown = setInterval(() => {}, 1000);

  beforeEach(() => {
    render(
      <ControlPanel
        countdown={countdown}
        showTimer={true}
        setShowTimer={setShowTimer}
        pauseOrResumeTimer={pauseOrResumeTimer}
        resetTimer={resetTimer}
      />
    );
  });

  it("renders all control panel buttons", () => {
    ['hide-timer', 'pause-resume', 'reset'].forEach((altText: string) => {
      expect(screen.getByAltText(altText)).toBeInTheDocument();
    })
  });

  it("calls setShowTimer when click on the hide button", () => {
    userEvent.click(screen.getByAltText('hide-timer'));
    expect(setShowTimer).toBeCalledTimes(1);
  });

  it("calls pauseOrResumeTimer timer when click on the pause-resume button", () => {
    userEvent.click(screen.getByAltText('pause-resume'));
    expect(pauseOrResumeTimer).toBeCalledTimes(1);
  });

  it("calls resetTimer when click on the reset button", () => {
    userEvent.click(screen.getByAltText('reset'));
    expect(resetTimer).toBeCalledTimes(1);
  });
})
