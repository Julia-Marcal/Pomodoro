import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  PomodoroTime: number;
  ShortRestTime: number;
  LongRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.PomodoroTime);
  const [timeCounting, setTimeCouting] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  const configureWork = () => {
    setTimeCouting(true);
    setWorking(true);
  };

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="work" onClick={() => configureWork()}></Button>
        <Button text="teste" onClick={() => console.log(1)}></Button>
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCouting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        <p>sed do eiusmod tempor incididunt ut labore et dolore magna</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation</p>
      </div>
    </div>
  );
}
