import map from 'lodash/map';
import find from 'lodash/find';
import drop from 'lodash/drop';
import slice from 'lodash/slice';
import merge from 'lodash/merge';
import concat from 'lodash/concat';
import randomstring from 'randomstring';

import {
  add,
  update as updateDB,
  remove as removeDB,
  find as findDB,
} from '../repositories/Database';

const imitateDBFailure = () => randomstring.generate({
  length: 1,
  capitalization: 'lowercase',
}) === 'a';

const recursivelyLoadComments = (commentID, initialStep) => {
  const key = initialStep ? '_id' : 'parentID';

  const comments = findDB(
    'comment',
    { [key]: commentID },
  );

  if (!comments || comments.length === 0) {
    return [];
  }

  return merge(
    {
      comments: map(
        comments,
        ({ _id }) => recursivelyLoadComments(_id),
      ),
    },
    comments,
  );
};

export const create = async (req, res) => {
  const newComment = add(
    'comment',
    merge(
      {
        parentID: 0,
      },
      req.body,
    ),
  );

  const {
    photoID,
  } = req.body;

  const photos = findDB(
    'photo',
    { _id: photoID },
  );

  if (!photos || photos.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: 'No photo associated with this ID',
      });
  }

  updateDB(
    'photo',
    { _id: photoID },
    {
      commentIDs: concat(
        photos[0].commentIDs,
        newComment._id,
      ),
    },
  );

  return res
    .status(200)
    .json({
      success: true,
      comment: newComment,
    });
};

export const update = async (req, res) => {
  updateDB(
    'comment',
    req.params,
    req.body,
  );

  return res
    .status(200)
    .json({
      success: true,
      comment: find(
        'comment',
        req.params,
      ),
    });
};

export const remove = async (req, res) => {
  removeDB(
    'comment',
    req.params,
  );

  return res
    .status(200)
    .json({
      success: true,
    });
};


export const getOne = async (req, res) => {
  const comments = findDB(
    'comment',
    req.params,
  );

  if (imitateDBFailure()) {
    return res
      .status(500)
      .json({
        success: false,
        error: 'Database connection error',
      });
  }

  return res
    .status(200)
    .json({
      success: true,
      comment: comments[0],
    });
};


export const getMany = async (req, res) => {
  let comments = findDB(
    'comment',
    { parentID: '0' },
  );

  if (imitateDBFailure()) {
    return res
      .status(500)
      .json({
        success: false,
        error: 'Database connection error',
      });
  }

  if (req.query.perPage && req.query.currentPage) {
    const {
      perPage = 10,
      currentPage = 1,
    } = req.query;

    comments = drop(comments, (currentPage - 1) * perPage);
    comments = slice(comments, 0, perPage);
  }

  if (req.query.subComments) {
    comments = map(comments, ({ _id }) => recursivelyLoadComments(
      _id,
      true,
    ));
  }

  return res
    .status(200)
    .json({
      comments,
      success: true,
    });
};
