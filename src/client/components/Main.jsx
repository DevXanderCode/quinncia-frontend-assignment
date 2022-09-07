/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
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

const PhotoItemCont = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
`;

const TextCont = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const TagItem = styled.div`
  border-radius: 1rem;
  padding: 0.05rem 1rem;
  margin: 0.5rem 0.35rem;
  border: 1px solid #d9d9d9;
`;

const TagsCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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

      {photos?.map((photo) => (
        <PhotoItem
          imageUrl={photo?.imageUrl}
          name={photo?.name}
          tags={photo?.tags}
          comments={photo?.comments}
          key={photo?._id}
        />
      ))}

      <AddPhoto visible={showPhotoModal} setVisble={setShowPhotoModal} />
    </Container>
  );
};

const PhotoItem = memo(({ imageUrl, name, tags = [], comments = [] }) => {
  return (
    <PhotoItemCont>
      <img src={imageUrl} className="w-full h-64 rounded-lg" alt={name} />
      <TextCont>
        <p>{`Photo name: ${name}`}</p>
      </TextCont>
      <TagsCont>
        {tags?.map((tag, idx) => (
          <TagItem key={`${tag}-${idx}`}>{tag}</TagItem>
        ))}
      </TagsCont>
    </PhotoItemCont>
  );
});

PhotoItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Main;
