import inc from 'ramda/es/inc';
import dec from 'ramda/es/dec';
import over from 'ramda/es/over';
import lensProp from 'ramda/es/lensProp';

import { COUNTER_INCREMENT, COUNTER_DECREMENT } from './constants';

const counterLens = lensProp('counter');

export const counterIncrement = () => ({
  type: COUNTER_INCREMENT,
});

export const counterDecrement = () => ({
  type: COUNTER_DECREMENT,
});

export default (state = { counter: 0 }, action) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return over(counterLens, inc, state);
    case COUNTER_DECREMENT:
      return over(counterLens, dec, state);
    default:
      return state;
  }
};
