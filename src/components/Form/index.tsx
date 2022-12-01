import React, { ChangeEvent, FC, KeyboardEvent, RefObject, useRef } from 'react';
import classNames from 'classnames';
import { IDigitalTimerProps, ICountDownTime } from '../../timer';
import { TIME_LABELS, DIGIT_PLACEHOLDER } from '../../constants';
import {
  getDigitInputIdentifier,
  getNextDigitIndex,
  transformInputValue
} from '../../utils';

interface InputFormProps extends IDigitalTimerProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pauseOrResumeTimer: () => void;
  resetTimer: () => void;
  time: ICountDownTime;
}

const Form: FC<InputFormProps> = (props) => {
  const {
    digitClassName,
    disableUpdateByKeyboard,
    onInputChange,
    pauseOrResumeTimer,
    resetTimer,
    time
  } = props;

  const hourRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const minuteRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const secondRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const formRefs: RefObject<HTMLInputElement>[] = [hourRef, minuteRef, secondRef];

  const digitStyles = classNames('digits', { [digitClassName as string]: digitClassName });

  const controlByKeyBoard = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) return resetTimer();
    if (e.key === 'Enter') pauseOrResumeTimer();
    if (e.key === 'ArrowRight') tabByArrowKey(e.currentTarget.name, 'next');
    if (e.key === 'ArrowLeft') tabByArrowKey(e.currentTarget.name, 'prev');
  };

  const tabByArrowKey = (
    currentDigitName: string,
    direction: string
  ): void => {
    if (!currentDigitName) return;
    const nextDigitIndex = getNextDigitIndex(currentDigitName, direction);
    if (nextDigitIndex >= 0) formRefs[nextDigitIndex].current?.focus();
  }

  return (
    <form className='timer-form' data-testid='timer-form'>
      {
        TIME_LABELS.map((timeLabel: string, index: number) => {
          const identifier = getDigitInputIdentifier(timeLabel);
          return (
            <div key={identifier}>
              <input
                data-testid={identifier}
                className={digitStyles}
                disabled={disableUpdateByKeyboard}
                name={timeLabel}
                onKeyDown={controlByKeyBoard}
                onChange={onInputChange}
                placeholder={DIGIT_PLACEHOLDER}
                ref={formRefs[index]}
                value={transformInputValue(time, timeLabel)}
              />
              {
                index < TIME_LABELS.length - 1 &&
                  <span className={digitStyles}>:</span>
              }
            </div>
          )
        })
      }
    </form>
  )
}

export default Form;
