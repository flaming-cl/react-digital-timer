import { FC } from 'react';
import { CountDownType, IDigitalTimerProps } from '../../timer';
interface ControlPanelProps extends IDigitalTimerProps {
    countdown: CountDownType;
    pauseOrResumeTimer: () => void;
    resetTimer: () => void;
    showTimer: boolean;
    setShowTimer: (showTimer: boolean) => void;
}
declare const ControlPanel: FC<ControlPanelProps>;
export default ControlPanel;
