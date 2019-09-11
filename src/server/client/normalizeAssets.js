const isObject = (x) => typeof x === 'object' && x !== null;

const normalizeAssets = (assets) => {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
};

export default normalizeAssets;
