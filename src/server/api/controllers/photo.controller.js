import drop from 'lodash/drop';
import map from 'lodash/map';
import every from 'lodash/every';
import some from 'lodash/some';
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

exports.create = async (req, res) => {
  const newPhoto = add(
    'photo',
    req.body,
  );

  return res
    .status(200)
    .json({
      success: true,
      photo: newPhoto,
    });
}


exports.update = async (req, res) => {
  update(
    'photo',
    req.params,
    req.body,
  );

  return res
    .status(200)
    .json({
      success: true,
      photo: find(
        'photo',
        req.params,
      ),
    });
}


exports.delete = async (req, res) => {
  remove(
    'photo',
    req.params,
  );

  return res
    .status(200)
    .json({
      success: true,
    });
}


exports.getOne = async (req, res) => {
  const photos = find(
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
}


exports.getMany = async (req, res) => {
  let photos = find(
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
    const _tagIDs = map(
      req.query.tags,
      (_tag) => find(
        'tag',
        { name: _tag },
      ),
    );

    photos = filter(
      photos,
      ({ tagIDs }) => every(
        _tagIDs,
        _tid => some(
          tagIDs,
          tagID => tagID === _tid,
        )
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

  
  // Populate comments
  // if (req.query.comments) {
  //   photos = map(
  //     photos,
  //     (photo) => {
  //       const comments = map(
  //         photo.commentIDs,
  //         cID => recursivelyLoadComments(cID, true),
  //       );

  //       return merge(
  //         {
  //           comments,
  //           commentIDs: null,
  //         },
  //         photo,
  //       );
  //     },
  //   );
  // }

  return res
    .status(200)
    .json({
      photos,
      success: true,
    });
}
