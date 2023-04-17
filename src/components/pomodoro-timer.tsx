/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';
const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  const [resting, setResting] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working]);

  const configureWork = () => {
    setTimeCouting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.PomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (Long: boolean) => {
    setTimeCouting(true);
    setWorking(false);
    setResting(true);
    if (Long) {
      setMainTime(props.LongRestTime);
    } else {
      setMainTime(props.ShortRestTime);
    }

    audioStopWorking.play();
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
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          classname={!working && !resting ? 'hidden' : ''}
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
