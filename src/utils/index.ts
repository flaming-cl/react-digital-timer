import {
  DIGIT_RANGE,
  MAX_TIME_VALUE,
  TIME_LABELS,
  TIMER_NAME,
  TIMES_UP_TEXT,
  MAX_SECONDS
} from '../constants';
import { ICountDownTime } from '../timer';

/**
 * Convert second integer to time objects
 *
 * @export
 * @param {number} seconds
 * @returns {ICountDownTime} timeObject
 */
export const getTimeLeft = (seconds: number): ICountDownTime => {
  if (seconds <= 0) return { hour: 0, minute: 0, second: 0 };
  if (seconds >= MAX_SECONDS) return { hour: 23, minute: 59, second: 59 }
  return {
    hour: Math.floor(seconds / 3600),
    minute: Math.floor(seconds / 60) % 60,
    second: seconds % 60
  }
};

/**
 * Covert time objects to seconds
 *
 * @export
 * @param {ICountDownTime} time
 * @returns {number} seconds
 */
export const getCountSeconds = (time: ICountDownTime): number => {
  if (time.hour < 0 || time.minute < 0 || time.second < 0) return 0;
  return time.hour * 3600 + time.minute * 60 + time.second
}

/**
 * Get index of prev/next formRefs index
 *
 * @export
 * @param {string} currentDigitName
 * @param {string} direction
 * @returns {number} nextDigitIndex
 */
export const getNextDigitIndex = (
  currentDigitName: string,
  direction: string,
): number => {
  const nextDigit = TIME_LABELS.indexOf(currentDigitName) + (direction === 'next' ? 1 : -1);
  const [MIN_DIGIT, MAX_DIGIT] = DIGIT_RANGE;
  if (nextDigit >= MIN_DIGIT && nextDigit <= MAX_DIGIT) return nextDigit;
  return -1;
};

/**
 * Check if the input digit reached max length
 *
 * @export
 * @param {string} previousDigitString
 * @param {string} newDigitString
 * @returns {boolean} reachedMaxLen
 */
export const isDigitReachedMaxLen = (previousDigitString: string, newDigitString:string): boolean => {
  const previousDigitLength = previousDigitString.length;
  return previousDigitLength === 2 && (newDigitString.length > previousDigitLength);
}

/**
 * Transform new time states to valid numbers
 *
 * @export
 * @param {string} digitNameString
 * @param {string} newValue
 * @returns {number} transformed digit number
 */
export const transformTimeState = (digitNameString: string, newValue: string): number => {
  const newValueNum = parseInt(newValue);
  if (!newValueNum) return 0;
  const maxTimeValue = MAX_TIME_VALUE[digitNameString];
  return newValueNum > maxTimeValue ? maxTimeValue - 1 : newValueNum;
}

/**
 * Transform input value for digit input forms
 *
 * @export
 * @param {ICountDownTime} time
 * @param {string} timeLabel
 * @returns {string} input string for displaying in forms
 */
export const transformInputValue = (time: ICountDownTime, timeLabel: string): string => {
  const timeDigit = time[timeLabel];
  if (timeDigit === 0) return '';
  if (timeDigit < 10) return `0${timeDigit}`;
  return timeDigit.toString();
}

/**
 * Check if browser notification permission granted
 *
 * @export
 * @returns {Promise<boolean>} is browser notification permission granted
 */
export const permissionGranted = async (): Promise<boolean> => {
  let granted: boolean = false;
  if (!('Notification' in window)) {
    return granted;
  } else if (Notification.permission === 'granted') {
    granted = true;
  } else if (Notification.permission !== 'denied') {
    granted = await Notification.requestPermission() === 'granted';
  }

  return granted;
}

/**
 * If permission granted, show time's up notification
 *
 * @export
 * @returns {Promise<Notification | null>} new notification instance
 */
export const showTimesUpWindow = async (): Promise<Notification | null>  => {
  if (await permissionGranted()) {
    return new Notification(`${TIMER_NAME}: ${TIMES_UP_TEXT}!`);
  }
  return null;
}

/**
 * Get digit input identifier
 *
 * @export
 * @param {string} timeLabel
 * @returns {string} digit input identifier
 */
export const getDigitInputIdentifier = (timeLabel: string) => `digital-clock-${timeLabel}`
