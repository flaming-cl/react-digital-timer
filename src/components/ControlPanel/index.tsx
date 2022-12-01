import React, { FC } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import { CountDownType, IDigitalTimerProps } from '../../timer';
import RESET from '../../assets/reset.png';
import PAUSE from '../../assets/pause.png';
import START from '../../assets/start.png';
import CLOCK from '../../assets/timer.png';

interface ControlPanelProps extends IDigitalTimerProps {
  countdown: CountDownType;
  pauseOrResumeTimer: () => void;
  resetTimer: () => void;
  showTimer: boolean;
  setShowTimer: (showTimer: boolean) => void;
}

const ControlPanel: FC<ControlPanelProps> = (props: ControlPanelProps) => {
  const {
    countdown,
    iconClassName,
    pauseOrResumeTimer,
    resetTimer,
    showTimer,
    setShowTimer
  } = props;

  const playPauseSrc = countdown ? PAUSE : START;
  const iconButtonStyle = classNames('timer-btn', { [iconClassName as string]: iconClassName })
  const handleShowTimer = () => setShowTimer(!showTimer);

  return (
    <section className='btn-wrapper'>
      <Button alt='hide-timer' className={iconButtonStyle} src={CLOCK} onClick={handleShowTimer}/>
      {
        showTimer &&
        <>
            <Button alt='pause-resume' className={iconButtonStyle} src={playPauseSrc} onClick={pauseOrResumeTimer}/>
            <Button alt='reset' className={iconButtonStyle} src={RESET} onClick={resetTimer}/>
        </>
      }
    </section>
  )
}

export default ControlPanel;
