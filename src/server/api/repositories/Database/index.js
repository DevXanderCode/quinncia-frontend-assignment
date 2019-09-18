import each from 'lodash/each';
import every from 'lodash/every';
import merge from 'lodash/merge';
import rmv from 'lodash/remove';

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

const filterObject = (filter, object) => {
  return filter(object, (_, key) => filter[key]);
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
}

const add = (featureName, body) => {
  const newDocument = filterObject(
    schemas[featureName],
    attachData('created', body)
  );

  Database[featureName].push(newDocument);
  return newDocument;
};

const find = (featureName, parameters) => filter(
  Database[featureName],
  (document) => every(parameters, (parameter, key) => document[key] === parameter),
);


const remove = (featureName, parameters) => {
  rmv(
    Database[featureName],
    (document) => every(parameters, (parameter, key) => document[key] === parameter),
  );
};

const update = (featureName, parameters, body) => {
  const objects = find(featureName, parameters);
  remove(featureName, parameters);
  each(objects, object => add(featureName, object));
};

export {
  add,
  find,
  remove,
  update,
};
