import map from 'lodash/map';
import drop from 'lodash/drop';
import slice from 'lodash/slice';
import merge from 'lodash/merge';
import randomstring from 'randomstring';

import {
  add,
  update as updateDB,
  remove as removeDB,
  find,
} from '../repositories/Database';

const imitateDBFailure = () => randomstring.generate({
  length: 1,
  capitalization: 'lowercase',
}) === 'a';

const recursivelyLoadComments = (commentID, initialStep) => {
  const key = initialStep ? '_id' : 'parentID';

  const comments = find(
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
    req.body,
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
  const comments = find(
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
  let comments = find(
    'comment',
    req.query,
  );

  if (imitateDBFailure()) {
    return res
      .status(500)
      .json({
        success: false,
        error: 'Database connection error',
      });
  }

  if (req.query.pagination) {
    const {
      perPage = 10,
      currentPage = 1,
    } = req.query.pagination;

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
