import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Spin, Modal } from 'antd';
import { SideBar, RightSideBar, Main } from './components';
import logo from './logo.svg';
import Counter from './Counter';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
`;

const App = () => {
  const { loading } = useSelector((state) => state?.photoReducer);
  return (
    <Container>
      <SideBar />
      <Main />
      <RightSideBar />
      {loading && <Loader />}
    </Container>
  );
};

const Loader = () => (
  <LoaderContainer>
    <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center">
      <Spin />
      {/* <p>Loading ...</p> */}
    </div>
  </LoaderContainer>
);

export default App;
