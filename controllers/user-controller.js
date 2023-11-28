const User = require("../schemas/user.js");

const getUser = async (req, res) => {
  const { nickname } = res.locals.user;

  try {
    if (!nickname) {
      res.status(404).json({ errorCode: "U001" });
      return;
    }

    const findUser = await User.findOne({ nickname });

    res.status(200).json({ user: findUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getUsers = async (req, res) => {
  const { nickname } = res.locals.user;

  try {
    const findUsers = await User.find({}).sort("-createdAt");

    const allUsers = findUsers
      .filter((user) => user.nickname !== nickname)
      .map((user) => {
        return {
          userId: user._id,
          nickname: user.nickname,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });

    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getUser,
  getUsers,
};
