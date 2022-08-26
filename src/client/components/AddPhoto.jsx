/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useState } from 'react';
import { Modal, Upload, message, Select, alert } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdDeleteOutline } from 'react-icons/md';
import { ADD_PHOTO, SET_LOADING } from '../redux/constants';
import apiCall from '../services/apiCall';
import paths from '../services/endpoints';

const UploadLabel = styled.label`
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 10px;
`;

const PreviewContainer = styled.div`
  display: flex;
  border: 1px solid #d9d9d9;
  margin-top: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 10px;
`;

const PreviewImg = styled.img`
  width: 3rem;
  hieght: 3rem;
  border-radius: 10px;
  margin-right: 1rem;
`;

const { Option } = Select;

const AddPhoto = ({ visible = false, setVisble }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state?.photoReducer);

  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const selectImg = (e) => {
    const imageFile = e.target.files[0];

    setImgPreview(imageFile);
  };

  const close = () => {
    setImgPreview(null);
    setVisble(false);
    setSelectedTags([]);
    setLoading(false);
  };

  const getPhotoContent = async (id) => {
    setLoading(true);

    try {
      const res = await apiCall({ path: `${paths?.['photo-content']}/${id}}`, method: 'get' });
      console.log('Loggig photo content', res);
    } catch (error) {
      console.log('photo content err', error);
    }

    setLoading(false);
  };

  const uploadPhoto = async () => {
    if (!imgPreview) {
      message.error('Please select image');
      return;
    }
    dispatch({ type: SET_LOADING, payload: true });
    setLoading(true);
    const formData = new FormData();
    formData.append('profile', imgPreview);
    formData.append('name', imgPreview?.name?.split('.')[0]);
    console.log('formdata', formData, imgPreview);
    try {
      const data = await apiCall({ path: paths?.photo, method: 'post', body: formData });

      if (data?.success) {
        dispatch({
          type: ADD_PHOTO,
          payload: { ...data?.photo },
          callback: selectedTags?.length && attachImageTag(data?.photo?._id),
        });
      }

      console.log('data', data);
    } catch (error) {
      console.log('Logging error', error);
    }
    setLoading(false);
    dispatch({ type: SET_LOADING, payload: false, callback: close() });
  };

  const attachImageTag = async (id) => {
    setLoading(true);
    try {
      const data = await apiCall({
        path: `${paths?.photo}/${id}/tags/attach`,
        method: 'put',
        body: selectedTags,
      });

      console.log('data after attaching tags', data);
    } catch (error) {
      console.log('error', error);
    }

    setLoading(false);
    dispatch({ type: SET_LOADING, payload: false, callback: close() });
  };

  return (
    <Modal
      title="Add Photo"
      centered
      visible={visible}
      onCancel={!loading && close}
      onOk={() => uploadPhoto()}
      confirmLoading={loading}>
      {imgPreview === null && (
        <>
          <input
            type="file"
            accept=".png,.jpeg, .jpg"
            id="imageUpload"
            key={Date.now()}
            hidden
            alt="image upload"
            onChange={(e) => selectImg(e)}
          />
          <UploadLabel htmlFor="imageUpload">Upload Image</UploadLabel>
        </>
      )}

      {imgPreview && (
        <PreviewContainer>
          <div className="flex items-center">
            <PreviewImg src={`${URL.createObjectURL(imgPreview)}`} />
            <div>
              <p className="mb-0">{imgPreview?.name}</p>
              <p>
                {(imgPreview?.size / 1000000).toFixed(1)}
                mb
              </p>
            </div>
          </div>

          <MdDeleteOutline
            size={22}
            color="red"
            onClick={() => {
              setImgPreview(null);
            }}
          />
        </PreviewContainer>
      )}

      {imgPreview && (
        <>
          <div className="mt-3">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select Tags"
              onSelect={(id) => {
                setSelectedTags((prevTags) => [...prevTags, id]);
                console.log('selected id', id);
              }}
              onDeselect={(id) => {
                setSelectedTags((prevTags) => prevTags.filter((tag) => tag?._id !== id));
                console.log('Deselect id', id);
              }}
              notFoundContent={<p>no tags found, please create some tags</p>}>
              {tags?.map((tag) => (
                <Option value={tag?._id} key={`tags-list-${tag?._id}`}>
                  {tag?.name}
                </Option>
              ))}
            </Select>
          </div>
        </>
      )}
    </Modal>
  );
};

AddPhoto.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisble: PropTypes.func.isRequired,
};

export default memo(AddPhoto);
