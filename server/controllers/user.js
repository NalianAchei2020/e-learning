import User from '../models/userModel.js';
export const updateUsers = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};
//delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};
//get
export const getUsers = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

//get all
export const getallusers = async (req, res, next) => {
  try {
    const getalllusers = await User.find();
    res.status(200).json(getalllusers);
  } catch (err) {
    next(err);
  }
};
