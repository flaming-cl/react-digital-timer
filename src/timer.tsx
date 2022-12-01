import React, { ChangeEvent, useState } from 'react';
import Form from './components/Form';
import ControlPanel from './components/ControlPanel';
import { DEFAULT_DIGITS } from './constants';
import {
  getTimeLeft,
  isDigitReachedMaxLen,
  getCountSeconds,
  showTimesUpWindow,
  transformTimeState
} from './utils';
import './styles.css';

export interface IDigitalTimerProps {
  readonly countDownTime?: ICountDownTime;
  readonly disableUpdateByKeyboard?: boolean;
  readonly disableControlPanel?: boolean;
  readonly digitClassName?: string;
  readonly iconClassName?: string;
  readonly showTimeUpMessage?: boolean;
  onComplete?: () => void;
  onTick?: (seconds: number) => void;
}

export interface ICountDownTime {
  [index: string]: number;
  hour: number;
  minute: number;
  second: number
}

export type CountDownType = ReturnType<typeof setInterval> | null;

const Timer = (props: IDigitalTimerProps) => {
  const {
    countDownTime,
    disableControlPanel,
    onComplete,
    onTick,
    showTimeUpMessage
  } = props;

  const INIT_DIGITS = getTimeLeft(getCountSeconds(countDownTime || DEFAULT_DIGITS));

  const [countdown, setCountdown] = useState<CountDownType>(null);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [time, setTimeDigits] = useState<ICountDownTime>(INIT_DIGITS);

  const pauseOrResumeTimer = (): void => {
    if (countdown) {
      cleanTimer(countdown);
    } else {
      runTimer();
    }
  }

  const resetTimer = () => {
    cleanTimer(countdown);
    setTimeDigits(INIT_DIGITS);
  }

  const cleanTimer = (countDown: CountDownType) => {
    if (!countDown) return;
    clearInterval(countDown);
    setCountdown(null);
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (isDigitReachedMaxLen(time[name].toString(), value)) return;
    setTimeDigits({...time, [name]: transformTimeState(name, value)})
  }

  const updateTimeLeft = (seconds: number): void => {
    setTimeDigits(getTimeLeft(seconds))
  }

  const runTimer = (): void => {
    const seconds = getCountSeconds(time);
    if (seconds <= 0) return;
    cleanTimer(countdown);
    updateTimeLeft(seconds);
    setUpInterval(seconds);
  };

  const onFinished = (newCountdown: ReturnType<typeof setInterval>) => {
    onComplete && onComplete();
    cleanTimer(newCountdown);
    showTimeUpMessage && showTimesUpWindow();
  }

  const setUpInterval = (seconds: number): void => {
    const last: number = seconds * 1000 + Date.now();
    const newCountdown: ReturnType<typeof setInterval> = setInterval(() => {
      const secondsLeft: number = Math.round((last - Date.now()) / 1000);
      onTick && onTick(secondsLeft);
      updateTimeLeft(secondsLeft);
      if (secondsLeft <= 0) onFinished(newCountdown);
    }, 1000);
    setCountdown(newCountdown);
  }

  const controlPanel = disableControlPanel
    ? null
    : (
        <ControlPanel
          {...props}
          countdown={countdown}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
          pauseOrResumeTimer={pauseOrResumeTimer}
          resetTimer={resetTimer}
        />
    );

  const digitForm = showTimer
    ? (
        <Form
          {...props}
          onInputChange={onInputChange}
          pauseOrResumeTimer={pauseOrResumeTimer}
          time={time}
          resetTimer={resetTimer}
        />
      )
    : null;

  return (
    <div className='timer'>
      {controlPanel}
      {digitForm}
    </div>
  )
}

export default Timer;
