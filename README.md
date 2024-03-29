# React-digital-timer

![](https://user-images.githubusercontent.com/51183663/204952551-805d512f-a54e-440e-9e6d-49adeec6fc55.png)

| Functionality | Control by buttons / keyboard         |
|---------------|---------------------------------------|
| set up time   | type in count down in the timer frame |
| start         | Play button / press Enter             |
| pause         | Pause button / press Enter            |
| reset | Reset button /    ctrl/command + Enter    |


## Installation

### Install via NPM

```shell
npm i react-digital-timer
```

### Import

```javascript
import { Timer } from 'react-digital-timer';
```

### Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Timer } from '../dist';
import './App.css';

const INIT_TIME = {
    hour: 0,
    minute: 0,
    second: 624
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p className="App-message">Digital Timer</p>
                <Timer
                    countDownTime={INIT_TIME}
                    onComplete={() => console.log('time\'s up')}
                />
            </header>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## Config Params

| Field                   | Type       | Description                                                                                | Example                                                 |
|-------------------------|------------|--------------------------------------------------------------------------------------------|---------------------------------------------------------|
| countDownTime           | `object`   | initial timer (after reset, the timer will also start with this initial time period)       | { hour: 0, minute: 20, second: 0 } // 20 minutes        |
| showTimeUpMessage       | `boolean`  | to enable browser notification when timer count down finished                              | true                                                    |
| disableUpdateByKeyboard | `boolean`  | to disable controling timer by keyboard. Enable this config to run a fixed time count down | true                                                    |
| disableControlPanel     | `boolean`  | to disable controling timer by buttons (control buttons will be hided)                     | true                                                    |
| digitClassName          | `string`   | to customize timer styles by your own CSS classname                                        | large-digit (you can find this in the example css file) |
| iconClassName           | `string`   | to customize control button styles by your own CSS classname                               | large-btn (you can find this in the example css file)   |
| onComplete              | `function` | callback function fires when timer count down finished                                     | () => console.log('time\'s up')                         |
| onTick                  | `function` | callback function fires during every second's count down                                   | (secondsLeft: number) => console.log(secondsLeft)           |

## Credits
Icons downloaded from icons8.com

## License
[MIT](https://github.com/flaming-cl/react-digital-timer/blob/master/LICENSE)
