import map from 'lodash/map';
import some from 'lodash/some';
import drop from 'lodash/drop';
import every from 'lodash/every';
import randomstring from 'randomstring';
import {
  add,
  update as updateDB,
  remove as removeDB,
  find,
} from '../repositories/Database';

const imitateDBFailure = () => 'a' === randomstring.generate({
  length: 1,
  capitalization: 'lowercase',
});

export const create = async (req, res) => {
  const newPhoto = add(
    'photo',
    req.body,
  );

  await new Promise((res) => {
    fs.move(req.file.path, `${__dirname}/../../storage/photo-${newPhoto._id}.png`, res);
  });

  return res
    .status(200)
    .json({
      success: true,
      photo: newPhoto,
    });
}


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
      photo: find(
        'photo',
        req.params,
      ),
    });
}


export const remove = async (req, res) => {
  removeDB(
    'photo',
    req.params,
  );

  return res
    .status(200)
    .json({
      success: true,
    });
}


export const getOne = async (req, res) => {
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

export const getContent = async (req, res) => {
  res.sendFile(path.join(__dirname, `../../storage/photo-${req.params.id}.png`));
};

export const getMany = async (req, res) => {
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
    const tags = map(
      req.query.tags,
      (_tag) => find(
        'tag',
        { name: _tag },
      ),
    );

    photos = filter(
      photos,
      ({ tagIDs }) => every(
        tags,
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

  return res
    .status(200)
    .json({
      photos,
      success: true,
    });
}
