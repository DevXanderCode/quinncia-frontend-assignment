import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { counterIncrement, counterDecrement } from './redux/counter';

const Container = styled.div`
  display: flex;
  margin-top: 16px;
  font-size: 16px;
  width: 100px;
  justify-content: space-between;
`;

const Counter = ({ counter, increment, decrement }) => (
  <Container>
    <button onClick={decrement} type="button">-</button>
    <span>{counter}</span>
    <button onClick={increment} type="button">+</button>
  </Container>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

const mapStateToProps = ({ counterReducer: { counter } }) => ({ counter });

const mapDispatchToProps = {
  increment: counterIncrement,
  decrement: counterDecrement,
};

export { Counter };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
