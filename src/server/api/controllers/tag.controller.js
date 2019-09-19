import drop from 'lodash/drop';
import find from 'lodash/find';
import slice from 'lodash/slice';
import {
  add,
  find as findDB,
} from '../repositories/Database';

export const create = async (req, res) => {
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

export const getOne = async (req, res) => {
  const tags = findDB(
    'tag',
    {},
  );

  const tag = find(
    tags,
    (_tag) => _tag.name.indexOf(req.query.tag) > -1,
  );

  return res
    .status(200)
    .json({
      tag: tag || '',
      success: true,
    });
};

export const getMany = async (req, res) => {
  let tags = findDB(
    'tag',
    {},
  );

  if (req.query.currentPage && req.query.perPage) {
    const {
      perPage = 10,
      currentPage = 1,
    } = req.query;

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
