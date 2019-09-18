import map from 'lodash/map';
import some from 'lodash/some';
import drop from 'lodash/drop';
import every from 'lodash/every';
import flatten from 'lodash/flatten';
import randomstring from 'randomstring';

import {
  add,
  update,
  remove,
  find,
} from '../repositories/Database';

const imitateDBFailure = () => 'a' === randomstring.generate({
  length: 1,
  capitalization: 'lowercase',
});

const recursivelyLoadComments = (commentID, initialStep) => {
  const key = initialStep ? '_id' : 'parentID';

  let comments = find(
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
}

exports.create = async (req, res) => {
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
}

exports.update = async (req, res) => {
  update(
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
}

exports.delete = async (req, res) => {
  remove(
    'comment',
    req.params,
  );

  return res
    .status(200)
    .json({
      success: true,
    });
}


exports.getOne = async (req, res) => {
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
}


exports.getMany = async (req, res) => {
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
}
