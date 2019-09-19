import map from 'lodash/map';
import some from 'lodash/some';
import drop from 'lodash/drop';
import every from 'lodash/every';
import slice from 'lodash/slice';
import filter from 'lodash/filter';
import merge from 'lodash/merge';
import concat from 'lodash/concat';
import fs from 'fs';
import path from 'path';
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

export const create = async (req, res) => {
  const newPhoto = add(
    'photo',
    merge(
      {
        likes: 0,
        tagIDs: [],
        commentIDs: [],
      },
      req.body,
    ),
  );

  await new Promise((result) => {
    fs.rename(
      req.file.path,
      `/Users/Shared/projects/Quinncia/quinncia-frontend-assignment/src/server/storage/photo-${newPhoto._id}.png`,
      result,
    );
  });

  return res
    .status(200)
    .json({
      success: true,
      photo: newPhoto,
    });
};


export const update = async (req, res) => {
  updateDB(
    'photo',
    req.params,
    req.body,
  );

  return res
    .status(200)
    .json({
      success: true,
      photo: findDB(
        'photo',
        req.params,
      ),
    });
};


export const attachTags = async (req, res) => {
  const {
    tagIDs,
  } = req.body;

  const {
    _id,
  } = req.params;

  const photos = findDB(
    'photo',
    { _id },
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
    { _id },
    { tagIDs: concat(photos[0].tagIDs, tagIDs) },
  );

  return res
    .status(200)
    .json({
      success: true,
      photo: findDB(
        'photo',
        req.params,
      ),
    });
};

export const remove = async (req, res) => {
  removeDB(
    'photo',
    req.params,
  );

  const {
    _id,
  } = req.params;

  // Delete photo from Storage
  try {
    fs.unlinkSync(path.join(
      '/Users/Shared/projects/Quinncia/quinncia-frontend-assignment/src/server/storage/photo',
      `../../storage/photo-${_id}.png`,
    ));
  } catch {}

  return res
    .status(200)
    .json({
      success: true,
    });
};


export const getOne = async (req, res) => {
  const photos = findDB(
    'photo',
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
      photo: photos[0],
    });
};

export const getContent = async (req, res) => {
  res.sendFile(path.join(
    '/Users/Shared/projects/Quinncia/quinncia-frontend-assignment/src/server/storage/photo',
    `../../storage/photo-${req.params.id}.png`,
  ));
};

export const getMany = async (req, res) => {
  let photos = findDB(
    'photo',
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

  if (req.query.tags) {
    const tags = map(
      req.query.tags,
      (_tag) => findDB(
        'tag',
        { name: _tag },
      ),
    );

    photos = filter(
      photos,
      ({ tagIDs }) => every(
        tags,
        (_tid) => some(
          tagIDs,
          (tagID) => tagID === _tid,
        ),
      ),
    );
  }

  if (req.query.pagination) {
    const {
      perPage = 10,
      currentPage = 1,
    } = req.query.pagination;

    photos = drop(photos, (currentPage - 1) * perPage);
    photos = slice(photos, 0, perPage);
  }

  return res
    .status(200)
    .json({
      photos,
      success: true,
    });
};
