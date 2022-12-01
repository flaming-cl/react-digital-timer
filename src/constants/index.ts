import { ICountDownTime } from "../timer";

export const TIMER_NAME = 'Digital Timer';
export const TIMES_UP_TEXT = 'Time\'s up';
export const TIME_LABELS = ['hour', 'minute', 'second'];
export const DIGIT_RANGE = [0, 2];
export const DIGIT_PLACEHOLDER = '00';
export const MAX_SECONDS = 86399;
export const MAX_TIME_VALUE: ICountDownTime = {
  hour: 24,
  minute: 60,
  second: 60,
} as const;

export const DEFAULT_DIGITS: ICountDownTime = {
  second: 0,
  minute: 0,
  hour: 0
};
