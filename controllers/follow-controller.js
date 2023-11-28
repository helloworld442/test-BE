const Follow = require("../schemas/follow.js");

const getFollow = async (req, res) => {
  const { nickname } = res.locals.user;

  try {
    const findFollow = await Follow.find({});

    const following = findFollow
      .filter(({ followerName }) => followerName === nickname)
      .map((follow) => follow.followingId);

    const follower = findFollow
      .filter(({ followingName }) => followingName === nickname)
      .map((follow) => follow.followerId);

    res.status(200).json({ following, follower });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const createFollow = async (req, res) => {
  const { followingName, followingId } = req.params;
  const { nickname: followerName, userId: followerId } = res.locals.user;

  try {
    const findFollow = await Follow.findOne({ followingName });

    //만약 이미 follow가 되었다면...
    if (findFollow) {
      const deleteFollow = await Follow.deleteOne({ followingName });
    }

    //만약 follow가 되자 않았다면...
    else {
      const createeFollow = await Follow.create({
        followerName,
        followerId,
        followingName,
        followingId,
      });
    }

    res.status(201).json({ message: "팔로우가 정상적으로 처리 됐습니다." });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = {
  getFollow,
  createFollow,
};
