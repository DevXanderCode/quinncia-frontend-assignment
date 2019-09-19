import each from 'lodash/each';
import every from 'lodash/every';
import merge from 'lodash/merge';
import rmv from 'lodash/remove';
import filter from 'lodash/filter';

import randomstring from 'randomstring';

const Database = {
  tags: [],
  photos: [],
  comments: [],
};

const schemas = {
  tag: {
    _id: true,
    name: true,
    created_at: true,
    updated_at: true,
  },
  photo: {
    _id: true,
    name: true,
    likes: true,
    tagIDs: true,
    commentIDs: true,
    created_at: true,
    updated_at: true,
  },
  comment: {
    _id: true,
    content: true,
    parentID: true,
    created_at: true,
    updated_at: true,
  },
};

const automaticAppendWhen = {
  created: {
    created_at: true,
    updated_at: true,
    _id: true,
  },
  updated: {
    updated_at: true,
  },
};

const filterObject = (fltr, object) => {
  const newObject = {};
  for (const i in object) {
    if (fltr[i]) {
      newObject[i] = object[i];
    }
  }

  return newObject;
};

const attachData = (operationName, body) => {
  const generalData = {
    _id: randomstring.generate(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return merge(
    body,
    filterObject(
      automaticAppendWhen[operationName],
      generalData,
    ),
  );
};

const add = (featureName, body) => {
  const newDocument = filterObject(
    schemas[featureName],
    attachData('created', body),
  );

  Database[`${featureName}s`].push(newDocument);
  return newDocument;
};

const find = (featureName, parameters) => filter(
  Database[`${featureName}s`],
  (document) => every(parameters, (parameter, key) => document[key] === parameter),
);


const remove = (featureName, parameters) => {
  rmv(
    Database[`${featureName}s`],
    (document) => every(parameters, (parameter, key) => document[key] === parameter),
  );
};

const update = (featureName, parameters, body) => {
  const objects = find(featureName, parameters);
  each(objects, (object, key) => {
    objects[key] = merge(
      object,
      body,
    );
  });
};

export {
  add,
  find,
  remove,
  update,
};
