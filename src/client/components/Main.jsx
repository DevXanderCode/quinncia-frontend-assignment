import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PHOTO_LIST, SET_LOADING, TAG_LIST } from '../redux/constants';
import AddPhoto from './AddPhoto';
import apiCall from '../services/apiCall';
import paths from '../services/endpoints';
import NoData from '../assets/no_data.svg';

const Container = styled.div`
  // width: calc(100% - 540px);
  width: 45%
  height: 100vh;
  overflow-y: auto;
`;

const EmptyImg = styled.img`
  width: 20rem;
  height: 20rem;
  margin: auto 0;
`;

const Main = () => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state?.photoReducer);

  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const getPhotos = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const res = await apiCall({ path: paths?.['photo-list'], method: 'get' });

      if (res?.success) {
        if (res?.photos?.length) {
          dispatch({ type: PHOTO_LIST, payload: res?.photos });
        }
      }
    } catch (error) {
      console.log('Logging photos errors', error);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

  const getTags = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const res = await apiCall({ path: paths?.['tag-list'], method: 'get' });

      console.log('tags re', res);

      if (res?.success) {
        if (res?.tags?.length) {
          dispatch({ type: TAG_LIST, payload: res?.tags });
        }
      }
    } catch (error) {
      console.log('Logging photos errors', error);
    }
    dispatch({ type: SET_LOADING, payload: false });
  };

  useEffect(() => {
    getPhotos();
    getTags();
  }, []);
  return (
    <Container>
      <div className="border-b">
        <div className="flex items-center justify-between p-3">
          <p className="text-3xl font-extrabold mb-0">Home</p>
          <Button onClick={() => setShowPhotoModal(true)}>Add Photo</Button>
        </div>
      </div>

      {photos?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full py-4">
          <EmptyImg src={NoData} />
          <p className="mt-4">No Photo uploaded</p>
        </div>
      )}

      <AddPhoto visible={showPhotoModal} setVisble={setShowPhotoModal} />
    </Container>
  );
};

export default Main;
