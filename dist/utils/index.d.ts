import { ICountDownTime } from '../timer';
/**
 * Convert second integer to time objects
 *
 * @export
 * @param {number} seconds
 * @returns {ICountDownTime} timeObject
 */
export declare const getTimeLeft: (seconds: number) => ICountDownTime;
/**
 * Covert time objects to seconds
 *
 * @export
 * @param {ICountDownTime} time
 * @returns {number} seconds
 */
export declare const getCountSeconds: (time: ICountDownTime) => number;
/**
 * Get index of prev/next formRefs index
 *
 * @export
 * @param {string} currentDigitName
 * @param {string} direction
 * @returns {number} nextDigitIndex
 */
export declare const getNextDigitIndex: (currentDigitName: string, direction: string) => number;
/**
 * Check if the input digit reached max length
 *
 * @export
 * @param {string} previousDigitString
 * @param {string} newDigitString
 * @returns {boolean} reachedMaxLen
 */
export declare const isDigitReachedMaxLen: (previousDigitString: string, newDigitString: string) => boolean;
/**
 * Transform new time states to valid numbers
 *
 * @export
 * @param {string} digitNameString
 * @param {string} newValue
 * @returns {number} transformed digit number
 */
export declare const transformTimeState: (digitNameString: string, newValue: string) => number;
/**
 * Transform input value for digit input forms
 *
 * @export
 * @param {ICountDownTime} time
 * @param {string} timeLabel
 * @returns {string} input string for displaying in forms
 */
export declare const transformInputValue: (time: ICountDownTime, timeLabel: string) => string;
/**
 * Check if browser notification permission granted
 *
 * @export
 * @returns {Promise<boolean>} is browser notification permission granted
 */
export declare const permissionGranted: () => Promise<boolean>;
/**
 * If permission granted, show time's up notification
 *
 * @export
 * @returns {Promise<Notification | null>} new notification instance
 */
export declare const showTimesUpWindow: () => Promise<Notification | null>;
/**
 * Get digit input identifier
 *
 * @export
 * @param {string} timeLabel
 * @returns {string} digit input identifier
 */
export declare const getDigitInputIdentifier: (timeLabel: string) => string;
