/// <reference types="react" />
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
    second: number;
}
export declare type CountDownType = ReturnType<typeof setInterval> | null;
declare const Timer: (props: IDigitalTimerProps) => JSX.Element;
export default Timer;
