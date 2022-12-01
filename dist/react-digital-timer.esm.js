import React, { useRef, useState } from 'react';
import classNames from 'classnames';

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var TIMER_NAME = 'Digital Timer';
var TIMES_UP_TEXT = 'Time\'s up';
var TIME_LABELS = ['hour', 'minute', 'second'];
var DIGIT_RANGE = [0, 2];
var DIGIT_PLACEHOLDER = '00';
var MAX_SECONDS = 86399;
var MAX_TIME_VALUE = {
  hour: 24,
  minute: 60,
  second: 60
};
var DEFAULT_DIGITS = {
  second: 0,
  minute: 0,
  hour: 0
};

/**
 * Convert second integer to time objects
 *
 * @export
 * @param {number} seconds
 * @returns {ICountDownTime} timeObject
 */
var getTimeLeft = function getTimeLeft(seconds) {
  if (seconds <= 0) return {
    hour: 0,
    minute: 0,
    second: 0
  };
  if (seconds >= MAX_SECONDS) return {
    hour: 23,
    minute: 59,
    second: 59
  };
  return {
    hour: Math.floor(seconds / 3600),
    minute: Math.floor(seconds / 60) % 60,
    second: seconds % 60
  };
};
/**
 * Covert time objects to seconds
 *
 * @export
 * @param {ICountDownTime} time
 * @returns {number} seconds
 */
var getCountSeconds = function getCountSeconds(time) {
  if (time.hour < 0 || time.minute < 0 || time.second < 0) return 0;
  return time.hour * 3600 + time.minute * 60 + time.second;
};
/**
 * Get index of prev/next formRefs index
 *
 * @export
 * @param {string} currentDigitName
 * @param {string} direction
 * @returns {number} nextDigitIndex
 */
var getNextDigitIndex = function getNextDigitIndex(currentDigitName, direction) {
  var nextDigit = TIME_LABELS.indexOf(currentDigitName) + (direction === 'next' ? 1 : -1);
  var MIN_DIGIT = DIGIT_RANGE[0],
    MAX_DIGIT = DIGIT_RANGE[1];
  if (nextDigit >= MIN_DIGIT && nextDigit <= MAX_DIGIT) return nextDigit;
  return -1;
};
/**
 * Check if the input digit reached max length
 *
 * @export
 * @param {string} previousDigitString
 * @param {string} newDigitString
 * @returns {boolean} reachedMaxLen
 */
var isDigitReachedMaxLen = function isDigitReachedMaxLen(previousDigitString, newDigitString) {
  var previousDigitLength = previousDigitString.length;
  return previousDigitLength === 2 && newDigitString.length > previousDigitLength;
};
/**
 * Transform new time states to valid numbers
 *
 * @export
 * @param {string} digitNameString
 * @param {string} newValue
 * @returns {number} transformed digit number
 */
var transformTimeState = function transformTimeState(digitNameString, newValue) {
  var newValueNum = parseInt(newValue);
  if (!newValueNum) return 0;
  var maxTimeValue = MAX_TIME_VALUE[digitNameString];
  return newValueNum > maxTimeValue ? maxTimeValue - 1 : newValueNum;
};
/**
 * Transform input value for digit input forms
 *
 * @export
 * @param {ICountDownTime} time
 * @param {string} timeLabel
 * @returns {string} input string for displaying in forms
 */
var transformInputValue = function transformInputValue(time, timeLabel) {
  var timeDigit = time[timeLabel];
  if (timeDigit === 0) return '';
  if (timeDigit < 10) return "0" + timeDigit;
  return timeDigit.toString();
};
/**
 * Check if browser notification permission granted
 *
 * @export
 * @returns {Promise<boolean>} is browser notification permission granted
 */
var permissionGranted = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var granted;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            granted = false;
            if ('Notification' in window) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", granted);
          case 5:
            if (!(Notification.permission === 'granted')) {
              _context.next = 9;
              break;
            }
            granted = true;
            _context.next = 14;
            break;
          case 9:
            if (!(Notification.permission !== 'denied')) {
              _context.next = 14;
              break;
            }
            _context.next = 12;
            return Notification.requestPermission();
          case 12:
            _context.t0 = _context.sent;
            granted = _context.t0 === 'granted';
          case 14:
            return _context.abrupt("return", granted);
          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function permissionGranted() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * If permission granted, show time's up notification
 *
 * @export
 * @returns {Promise<Notification | null>} new notification instance
 */
var showTimesUpWindow = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return permissionGranted();
          case 2:
            if (!_context2.sent) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", new Notification(TIMER_NAME + ": " + TIMES_UP_TEXT + "!"));
          case 4:
            return _context2.abrupt("return", null);
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function showTimesUpWindow() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get digit input identifier
 *
 * @export
 * @param {string} timeLabel
 * @returns {string} digit input identifier
 */
var getDigitInputIdentifier = function getDigitInputIdentifier(timeLabel) {
  return "digital-clock-" + timeLabel;
};

var Form = function Form(props) {
  var _classNames;
  var digitClassName = props.digitClassName,
    disableUpdateByKeyboard = props.disableUpdateByKeyboard,
    onInputChange = props.onInputChange,
    pauseOrResumeTimer = props.pauseOrResumeTimer,
    resetTimer = props.resetTimer,
    time = props.time;
  var hourRef = useRef(null);
  var minuteRef = useRef(null);
  var secondRef = useRef(null);
  var formRefs = [hourRef, minuteRef, secondRef];
  var digitStyles = classNames('digits', (_classNames = {}, _classNames[digitClassName] = digitClassName, _classNames));
  var controlByKeyBoard = function controlByKeyBoard(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) return resetTimer();
    if (e.key === 'Enter') pauseOrResumeTimer();
    if (e.key === 'ArrowRight') tabByArrowKey(e.currentTarget.name, 'next');
    if (e.key === 'ArrowLeft') tabByArrowKey(e.currentTarget.name, 'prev');
  };
  var tabByArrowKey = function tabByArrowKey(currentDigitName, direction) {
    var _formRefs$nextDigitIn;
    if (!currentDigitName) return;
    var nextDigitIndex = getNextDigitIndex(currentDigitName, direction);
    if (nextDigitIndex >= 0) (_formRefs$nextDigitIn = formRefs[nextDigitIndex].current) == null ? void 0 : _formRefs$nextDigitIn.focus();
  };
  return React.createElement("form", {
    className: 'timer-form',
    "data-testid": 'timer-form'
  }, TIME_LABELS.map(function (timeLabel, index) {
    var identifier = getDigitInputIdentifier(timeLabel);
    return React.createElement("div", {
      key: identifier
    }, React.createElement("input", {
      "data-testid": identifier,
      className: digitStyles,
      disabled: disableUpdateByKeyboard,
      name: timeLabel,
      onKeyDown: controlByKeyBoard,
      onChange: onInputChange,
      placeholder: DIGIT_PLACEHOLDER,
      ref: formRefs[index],
      value: transformInputValue(time, timeLabel)
    }), index < TIME_LABELS.length - 1 && React.createElement("span", {
      className: digitStyles
    }, ":"));
  }));
};

var Button = function Button(props) {
  var alt = props.alt,
    className = props.className,
    onClick = props.onClick,
    src = props.src;
  return React.createElement("img", {
    alt: alt,
    className: className,
    "data-testid": alt,
    src: src,
    onClick: onClick
  });
};

var RESET = "data:image/png;base64,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";

var PAUSE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAFVUlEQVR4nO2d23IbRRCGP0u2ZcfGlVjg2NiOAySAb1IFpuCCKwpeI8/DA/ASeQq44lAQDlWhikNOkNjYIgXESCh25AMXLYNshHZmtmdX2u2vaks3sz1T/Wt757Q9YBiGYRiGYRhG2RjLuwEJTAEXgGeAue5VA8aBye4vwAHwtPu7BzSBP7vXH8B+pq32YNgEqAJLwEVgATivZPcx0OheO8Chkt3UDIMAY8CzwGVgDZiIXF8H2AIeAL8Ax5HrG0ieAlSBF4FXgdmc2tACvgfuAkd5NCAPAarAVcTx0znU348niBC3yTg8ZS3AMrABzGRcrytt4CvgYVYVZiXADOL45YzqS8sWcBMRJCpZCLACvIV0G0eJDvA58rKORjWi7QrweveKWU8sqsAl5D21Q6TeUizH1IB3gNVI9rNkHhmXbBLhBR1DgGnE+fMRbOfFDBJKt5DQpIa2AHPAe8jUQdGoISFpG8WpDU0BpoF3Gd4upgYTSFh9iNKToCVADXF+Ef/5Z5kAFoGfUXgnaAhQQWL+BQVbo8IUMln4Eyl7RxoCbFCM3o4v55CxzXYaI2kFWAVeS2ljlKkDu8i6QxCVFJXPICPcsvMmKToeaQTYIP7c/SgwiYz2gwgVYIXRmVjLgmB/hAhQJYXiBSZozitEgJcp9mArlFngiu9NvgJUgFd8KykR63g+Bb4CvMTwLCMOI9PACz43jCcX+YcxZB03BnXgOnANGWX2sgfcAm7gPujRtufDOnDHtbDP43KROOGnDryP/HP6/SHGkR7G28DHyAJ6lvZ8mQR+Bf5yKewTgi4HNSeZ67htS5ntls3aXgjOvnIVoEq8+Z5rymW17YVwCcfo4irAEvFGvWdj9CBcOgDa9kKYQEJ2Iq4COBkzTqEqwEKKhpQVNQGm0NulXCbOIyuFA3ERoEwrXZqM4eA7FwHKsM4bi0TfuQgwp9CQspLoO3sC4qIigE2+hZM4JnERwGfCzjhNou9cBLB133ASfWdPQFxUBDAi4iLAQfRWFJfEDbwuAqjuhy8ZKgLYExBOou9cBNBesisTe0kFXARoKjSkrCRu2nURIHjnr6EjgD0B4ST6zkWA3xUaUkaOkVxFA3ERYB/Jt2P48RiHryldR8KNdG0pJU4+MwHioSrADvFGxIl95R5cspdo2wuhg7IAh8TLoXPLo+y3OdgL4QGO3xD7zIbeD2tLIjeQ1GFJtLpls7YXgrOvfHZHt5FNp9p5f1rILuV69zo7h/4E+Br4AAmFWdvzpQl841rYN2HTVeANz3vKxhd4fB/guyBzF5ucG0QbuOdzg68AR0h2QaM/3+GZ/jJkSfI2jl9/lIwWEiG8CBHgEIlzxmm+JCB9Teii/DaSvssQNpE0yN6k2RVxE8lYXnaeIv/+INKkq+kgCw5rKWwUgU+A30JvTpsvqIl8hFBPaWdU+aF7BaORMauB5FA7p2BrlHgEfMoQpCw7RibqnsfvC8VRZhf4CIUtO1pZE4+QXtEqo5cj2pc28CF+097/i2be0AOke7pCcXdUnzhfbSCqnTl3H5kLX6R44WgXZedDnNzRB4gICxTnxfwIifkqYaeXWNnTD5FFiQrwXKQ6suJHpLcTZY9s7Lz+DWR7xlIGdWnTAT5DZn+jnbRkR5j0ZxOZXijEESa9LCPZBfM6tiqJFuL4oIm1EPI6xuoKktprWD6BbSOh5g4FP8aqlwpykNs6+T0RTcTx9yjRQW79mEdyvK3hkGEkJSdHGd4nzq4IL4ZFgBOqSJ6dRf49zDNtG485fZhnAzvM05ka/z3Odork42xPjrJtMuTH2RqGYRiGYRiGUT7+Bgr08T6jdYU0AAAAAElFTkSuQmCC";

var START = "data:image/png;base64,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";

var CLOCK = "data:image/png;base64,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";

var ControlPanel = function ControlPanel(props) {
  var _classNames;
  var countdown = props.countdown,
    iconClassName = props.iconClassName,
    pauseOrResumeTimer = props.pauseOrResumeTimer,
    resetTimer = props.resetTimer,
    showTimer = props.showTimer,
    setShowTimer = props.setShowTimer;
  var playPauseSrc = countdown ? PAUSE : START;
  var iconButtonStyle = classNames('timer-btn', (_classNames = {}, _classNames[iconClassName] = iconClassName, _classNames));
  var handleShowTimer = function handleShowTimer() {
    return setShowTimer(!showTimer);
  };
  return React.createElement("section", {
    className: 'btn-wrapper'
  }, React.createElement(Button, {
    alt: 'hide-timer',
    className: iconButtonStyle,
    src: CLOCK,
    onClick: handleShowTimer
  }), showTimer && React.createElement(React.Fragment, null, React.createElement(Button, {
    alt: 'pause-resume',
    className: iconButtonStyle,
    src: playPauseSrc,
    onClick: pauseOrResumeTimer
  }), React.createElement(Button, {
    alt: 'reset',
    className: iconButtonStyle,
    src: RESET,
    onClick: resetTimer
  })));
};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = "@font-face {\n  font-family: 'DIGIT';\n  src: url(data:font/woff2;base64,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) format('woff2');\n}\n\n::placeholder {\n  color: #000000;\n  opacity: 1; /* Firefox */\n}\n\n:-ms-input-placeholder {\n  color: #000000;\n}\n\n::-ms-input-placeholder {\n  color: #000000;\n}\n\n.hide {\n  display: none;\n}\n\n.timer {\n  margin-left: 2px;\n  box-sizing: border-box;\n  font-size: 10px;\n  display: flex;\n  direction: ltr;\n}\n\n.timer-btn {\n  height: 3vw;\n  width: 3vw;\n  margin: 1px 8px 0 0;\n  cursor: pointer;\n}\n\n.timer-form {\n  display: flex;\n  width: max-content;\n  border: 3px solid white;\n  background: white;\n  outline: none;\n  justify-content: center;\n  align-items: center;\n  padding: 0 0.8vw;\n}\n\n.digits {\n  font-family: 'DIGIT';\n  outline: none;\n  font-size: 3vw;\n  border: none;\n  color: black;\n  width: 3vw;\n  text-align: center;\n  margin-top: 1px;\n  background: none;\n}\n\n.hide-show-btn {\n  cursor: pointer;\n  padding: 4px 6px;\n  width: 11px;\n  height: 11px;\n  margin: 3px 3px;\n}\n\n.hide-show-btn:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n}\n\n.btn-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n";
n(css,{});

var Timer = function Timer(props) {
  var countDownTime = props.countDownTime,
    disableControlPanel = props.disableControlPanel,
    onComplete = props.onComplete,
    onTick = props.onTick,
    showTimeUpMessage = props.showTimeUpMessage;
  var INIT_DIGITS = getTimeLeft(getCountSeconds(countDownTime || DEFAULT_DIGITS));
  var _useState = useState(null),
    countdown = _useState[0],
    setCountdown = _useState[1];
  var _useState2 = useState(true),
    showTimer = _useState2[0],
    setShowTimer = _useState2[1];
  var _useState3 = useState(INIT_DIGITS),
    time = _useState3[0],
    setTimeDigits = _useState3[1];
  var pauseOrResumeTimer = function pauseOrResumeTimer() {
    if (countdown) {
      cleanTimer(countdown);
    } else {
      runTimer();
    }
  };
  var resetTimer = function resetTimer() {
    cleanTimer(countdown);
    setTimeDigits(INIT_DIGITS);
  };
  var cleanTimer = function cleanTimer(countDown) {
    if (!countDown) return;
    clearInterval(countDown);
    setCountdown(null);
  };
  var onInputChange = function onInputChange(e) {
    var _extends2;
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    if (isDigitReachedMaxLen(time[name].toString(), value)) return;
    setTimeDigits(_extends({}, time, (_extends2 = {}, _extends2[name] = transformTimeState(name, value), _extends2)));
  };
  var updateTimeLeft = function updateTimeLeft(seconds) {
    setTimeDigits(getTimeLeft(seconds));
  };
  var runTimer = function runTimer() {
    var seconds = getCountSeconds(time);
    if (seconds <= 0) return;
    cleanTimer(countdown);
    updateTimeLeft(seconds);
    setUpInterval(seconds);
  };
  var onFinished = function onFinished(newCountdown) {
    onComplete && onComplete();
    cleanTimer(newCountdown);
    showTimeUpMessage && showTimesUpWindow();
  };
  var setUpInterval = function setUpInterval(seconds) {
    var last = seconds * 1000 + Date.now();
    var newCountdown = setInterval(function () {
      var secondsLeft = Math.round((last - Date.now()) / 1000);
      onTick && onTick(secondsLeft);
      updateTimeLeft(secondsLeft);
      if (secondsLeft <= 0) onFinished(newCountdown);
    }, 1000);
    setCountdown(newCountdown);
  };
  var controlPanel = disableControlPanel ? null : React.createElement(ControlPanel, Object.assign({}, props, {
    countdown: countdown,
    showTimer: showTimer,
    setShowTimer: setShowTimer,
    pauseOrResumeTimer: pauseOrResumeTimer,
    resetTimer: resetTimer
  }));
  var digitForm = showTimer ? React.createElement(Form, Object.assign({}, props, {
    onInputChange: onInputChange,
    pauseOrResumeTimer: pauseOrResumeTimer,
    time: time,
    resetTimer: resetTimer
  })) : null;
  return React.createElement("div", {
    className: 'timer'
  }, controlPanel, digitForm);
};

export { Timer };
//# sourceMappingURL=react-digital-timer.esm.js.map
