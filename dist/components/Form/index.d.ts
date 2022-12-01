import { ChangeEvent, FC } from 'react';
import { IDigitalTimerProps, ICountDownTime } from '../../timer';
interface InputFormProps extends IDigitalTimerProps {
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    pauseOrResumeTimer: () => void;
    resetTimer: () => void;
    time: ICountDownTime;
}
declare const Form: FC<InputFormProps>;
export default Form;
