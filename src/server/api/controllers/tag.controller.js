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
}
