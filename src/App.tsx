import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        PomodoroTime={1500}
        ShortRestTime={300}
        LongRestTime={900}
        cycles={4}
      />
    </div>
  );
}

export default App;
