import {
  getTimeLeft,
  getCountSeconds,
  getNextDigitIndex,
  isDigitReachedMaxLen,
  transformTimeState,
  transformInputValue
} from './index';

describe('convert seconds to time objects', () => {
  it('returns a combination of hour/minute/second', () => {
    expect(getTimeLeft(3100)).toEqual({
      hour: 0,
      minute: 51,
      second: 40
    });
    expect(getTimeLeft(3600)).toEqual({
      hour: 1,
      minute: 0,
      second: 0
    });
  });

  it('returns zeros when the input second <= 0 ', () => {
    expect(getTimeLeft(-1)).toEqual({
      hour: 0,
      minute: 0,
      second: 0
    });
    expect(getTimeLeft(0)).toEqual({
      hour: 0,
      minute: 0,
      second: 0
    });
  });
});

describe('covert time objects to seconds', () => {
  it('returns calculated seconds (hour * 60 + minute * 60 + second)', () => {
    expect(getCountSeconds({ hour: 0, minute: 51, second: 40 })).toBe(3100);
    expect(getCountSeconds({ hour: 0, minute: 59, second: 2 })).toBe(3542);
  });

  it('returns 0 if digit value < 0', () => {
    expect(getCountSeconds({ hour: -1, minute: 51, second: 40 })).toBe(0);
    expect(getCountSeconds({ hour: 0, minute: -1, second: 0 })).toBe(0);
  });
});

describe('get index of prev/next formRefs index', () => {
  it('returns index of the previous digit', () => {
    expect(getNextDigitIndex('minute', 'prev')).toBe(0);
  });

  it('returns index of the next digit', () => {
    expect(getNextDigitIndex('hour', 'next')).toBe(1);
  });

  it('returns -1 if the input value is out of range (ranging from 0 to 2)', () => {
    expect(getNextDigitIndex('hour', 'prev')).toBe(-1);
    expect(getNextDigitIndex('second', 'next')).toBe(-1);
  });
});

describe('check if the input digit reached max length', () => {
  it('returns false when not reached max length', () => {
    // previous value length < 2 and new value length > previous value length
    expect(isDigitReachedMaxLen('1', '12')).toBe(false);
    expect(isDigitReachedMaxLen('12', '1')).toBe(false);
  });

  it('returns true when reached max length', () => {
    // previous value length = 2 and new value length > previous value length)
    expect(isDigitReachedMaxLen('12', '123')).toBe(true);
  });
});

describe('transform new time state to a valid number', () => {
  it('returns 0 when new digit input value is not a number string', () => {
    expect(transformTimeState('hour', 'ten')).toBe(0);
    expect(transformTimeState('minute', '')).toBe(0);
  });

  // the max count down value is: 23:59:59
  it('returns the max value when a new input value reaches limit', () => {
    expect(transformTimeState('hour', '99')).toBe(23);
    expect(transformTimeState('minute', '80')).toBe(59);
    expect(transformTimeState('second', '65')).toBe(59);
  });

  it('converts a valid input value string to a number', () => {
    expect(transformTimeState('hour', '23')).toBe(23);
    expect(transformTimeState('minute', '03')).toBe(3);
    expect(transformTimeState('second', '10')).toBe(10);
  });
});

describe('transform input value for digit input forms', () => {
  const newTimeState = {
    hour: 1,
    minute: 0,
    second: 22
  }
  it('returns an empty string when new input value is 0', () => {
    expect(transformInputValue(newTimeState, 'minute')).toBe('');
  });

  it('returns a string of (0 + digit) when a new input value is smaller than 10', () => {
    expect(transformInputValue(newTimeState, 'hour')).toBe('01');
  });

  it('returns a number string for a two digit input number', () => {
    expect(transformInputValue(newTimeState, 'second')).toBe('22');
  });
});
