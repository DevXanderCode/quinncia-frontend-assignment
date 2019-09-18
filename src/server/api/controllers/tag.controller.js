import drop from 'lodash/drop';
import find from 'lodash/find';
import slice from 'lodash/slice';
import {
  add,
} from '../repositories/Database';

exports.create = async (req, res) => {
  const newTag = add(
    'tag',
    req.body,
  );

  return res
    .status(200)
    .json({
      success: true,
      tag: newTag,
    });
};

exports.getOne = async (req, res) => {
  const tags = find(
    'tag',
    {},
  );

  const tag = find(
    tags,
    (_tag) => _tag.indexOf(req.query.tag) > -1,
  );

  return res
    .status(200)
    .json({
      tag: tag || '',
      success: true,
    });
};

exports.getMany = async (req, res) => {
  let tags = find(
    'tag',
    {},
  );

  if (req.query.pagination) {
    const {
      perPage = 10,
      currentPage = 1,
    } = req.query.pagination;

    tags = drop(tags, (currentPage - 1) * perPage);
    tags = slice(tags, 0, perPage);
  }

  return res
    .status(200)
    .json({
      tags,
      success: true,
    });
};
