# React-digital-timer

![](https://user-images.githubusercontent.com/51183663/204952551-805d512f-a54e-440e-9e6d-49adeec6fc55.png)

A React digital timer supports keyboard/button control.
- set up count down: type in time to count down in the timer frame
- start the timer: click on the Play button, or press Enter
- pause the timer: click on the Pause button, or press Enter
- reset the timer: click on the Reset button, or press ctrl/command + Enter

## Installation

### Install via NPM

```shell
npm i react-digital-timer
```

### Import

```javascript
import { Timer } from 'react-digital-timer';
```

## Config Params

| Field                   | Type       | Description                                                                          | Example                                                 |
|-------------------------|------------|--------------------------------------------------------------------------------------|---------------------------------------------------------|
| countDownTime           | `object`   | initial timer (after reset, the timer will also start with this initial time period) | { hour: 0, minute: 20, second: 0 } // 20 minutes        |
| showTimeUpMessage       | `boolean`  | to enable browser notification when timer count down finished                  | true                                                    |
| disableUpdateByKeyboard | `boolean`  | to disable controling timer by keyboard                                     | true                                                    |
| disableControlPanel     | `boolean`  | to disable controling timer by buttons (control buttons will be hided)      | true                                                    |
| digitClassName          | `string`   | to customize timer styles by your own CSS classname                         | large-digit (you can find this in the example css file) |
| iconClassName           | `string`   | to customize control button styles by your own CSS classname                | large-btn (you can find this in the example css file)   |
| onComplete              | `function` | callback function fires when timer count down finished                               | () => console.log('time\'s up')                         |
| onTick                  | `function` | callback function fires during every second's count down                             | (secondsLeft: number) => console.log(secondsLeft)           |

## Credits
Icons downloaded from icons8.com

## License
[MIT](https://github.com/flaming-cl/react-digital-timer/blob/master/LICENSE)
