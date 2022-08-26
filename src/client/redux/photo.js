import { ADD_PHOTO, PHOTO_LIST, TAG_LIST, ADD_TAG, SET_LOADING } from './constants';

const initialState = {
  loading: true,
  photos: [],
  tags: [],
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_LIST:
      return {
        ...state,
        photos: [...action.payload],
      };
    case ADD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };

    case TAG_LIST:
      return {
        ...state,
        tags: [...action.payload],
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [action.payload, ...state.tags],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default photoReducer;
