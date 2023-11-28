const Like = require("../schemas/likes.js");

const getLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const findLikes = await Like.find({ postId });

    const likeCount = findLikes.length;

    res.status(200).json({ likeCount });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const createLikes = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  try {
    const findLike = await Like.findOne({ postId, userId });

    //만약에 findLike가 있다면 해당 로직 처리
    if (findLike) {
      const deleteLike = await Like.deleteOne({ postId, userId });
    }

    // 만약에 findLike가 없다면 해당 로직 처리
    else {
      const createLike = await Like.create({ postId, userId });
    }

    res.status(201).json({ message: "좋아요 수정이 완료 되었습니다" });
  } catch (error) {
    res.status(403).json({ errorCode: "L001", errorMessage: error.message });
  }
};

module.exports = {
  getLikes,
  createLikes,
};
