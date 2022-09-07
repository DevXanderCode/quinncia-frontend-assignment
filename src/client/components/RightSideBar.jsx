import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Container = styled.div`
  // width: 300px;
  width: 30%;
  height: 100vh;
  border-left: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: calc(100% - 50px);
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #f7f9f9;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1.2rem;
`;

const ItemImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  margin-right: 1rem;
`;

const RightSideBar = () => {
  const { photos } = useSelector((state) => state?.photoReducer);
  return (
    <Container>
      <InnerContainer>
        <Title className="text-3xl">Recent Activities</Title>

        {photos?.map((photo) => (
          <Item
            ley={`activities-${photo?.id}`}
            image={photo}
            name={photo?.name}
            imageUrl={photo?.imageUrl}
            date={photo?.updated_at}
          />
        ))}

        {photos?.length === 0 && <p>No recent activity</p>}
      </InnerContainer>
    </Container>
  );
};

const Item = memo(({ name = ' Image', imageUrl, date, image }) => (
  <div className="mb-4 flex items-center">
    <div>
      <ItemImg src={imageUrl} alt={name} />
    </div>

    <div>
      <p className="mb-0 font-extrabold truncate">Created {name}</p>
      <p className="font-light">{moment(date).format('DD-MM-YYYY, HH:mm a')}</p>
    </div>
  </div>
));

Item.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default RightSideBar;
