import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiHash } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import PropTypes from 'prop-types';
import logo from '../logo.svg';

const Container = styled.div`
  // width: 240px;
  width: 25%;
  height: 100vh;
  overflow-scroll-y: auto;
  border-right: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const Text = styled.p`
  margin-bottom: 0;
  font-size: 1.3rem;
  color: #333;
  margin-left: 1rem;
`;

const BarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 1.4rem;
  width: fit-content;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  animation: ${Spin} infinite 20s linear;
  height: 4rem;
  pointer-events: none;
  width: 4rem;
`;

const item = [
  { id: 1, name: 'Home', Icon: <AiOutlineHome size={22} /> },
  { id: 2, name: 'Explore', Icon: <BiHash size={22} /> },
  { id: 3, name: 'Notification', Icon: <GrNotification size={22} /> },
  { id: 4, name: 'Messages', Icon: <AiOutlineMail size={22} /> },
  { id: 5, name: 'Explore', Icon: <BiHash size={22} /> },
];

const SideBar = () => (
  <Container>
    <div className="flex-col items-start justify-start ">
      <Logo src={logo} alt="logo" />
      {item?.map((i) => (
        <SideBarItem {...i} key={`sidebar-item-${i?.id}`} />
      ))}
    </div>
  </Container>
);

const SideBarItem = memo(({ Icon, name = 'Home' }) => (
  <BarItem>
    {Icon || <AiOutlineHome size={20} />}
    <Text>{name}</Text>
  </BarItem>
));

SideBarItem.propTypes = {
  Icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default SideBar;
