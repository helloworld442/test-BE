const Post = require("../schemas/posts");
const Comment = require("../schemas/comments");

const getComments = async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  try {
    if (!post) {
      res.status(404).json({ errorMessage: "게시글이 존재하지 않습니다." });
      return;
    }

    const findLists = await Comment.find({ postId: postId });

    const commentLists = findLists.map((comment) => {
      return {
        commentId: comment._id,
        userId: comment.userId,
        nickname: comment.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });

    res.status(200).json({ comments: commentLists });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const createComment = async (req, res) => {
  const { userId, nickname } = res.locals.user;
  const { postId } = req.params;
  const { comment } = req.body;

  const post = await Post.findOne({ _id: postId });

  try {
    if (!post) {
      res.status(404).json({ errorCode: "C001" });
      return;
    }

    if (!req.cookies) {
      res.status(403).json({ errorCode: "C002" });
      return;
    }

    if (!comment) {
      res.status(400).json({ errorCode: "C003" });
      return;
    }

    await Comment.create({ postId, userId, nickname, comment });

    res.status(201).json({ message: "댓글을 작성하였습니다." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateComment = async (req, res) => {
  const { postId } = req.params;
  const { commentId } = req.params;
  const { userId } = res.locals.user;
  const { comment } = req.body;

  try {
    const owner_comment = await Post.findOne({ _id: postId });
    if (!owner_comment) {
      res.status(404).json({ errorCode: "C009" });
      return;
    }

    if (!req.cookies) {
      res.status(403).json({ errorCode: "C010" });
      return;
    }

    if (!comment) {
      res.status(400).json({ errorCode: "C011" });
      return;
    }

    const update_target = await Comment.findOne({ _id: commentId });

    if (!update_target) {
      res.status(404).json({ errorCode: "C012" });
      return;
    }

    if (userId !== update_target.userId) {
      res.status(403).json({ errorCode: "C013" });
      return;
    }

    const updatedAt = new Date();
    updatedAt.setHours(updatedAt.getHours() + 9);

    const update_done = await Comment.updateOne(
      { _id: commentId },
      { $set: { comment, updatedAt } }
    );

    if (update_done.modifiedCount === 0) {
      res.status(400).json({ errorCode: "C014" });
      return;
    }

    res.status(200).json({ message: "댓글을 수정하였습니다." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteComment = async (req, res) => {
  const { postId } = req.params;
  const { commentId } = req.params;
  const { userId } = res.locals.user;

  try {
    const owner_comment = await Post.findOne({ _id: postId });
    if (!owner_comment) {
      res.status(404).json({ errorCode: "C004" });
      return;
    }

    if (!req.cookies) {
      res.status(403).json({ errorCode: "C005" });
      return;
    }

    const delete_target = await Comment.findOne({ _id: commentId });

    if (!delete_target) {
      res.status(404).json({ errorCode: "C006" });
      return;
    }

    if (userId !== delete_target.userId) {
      res.status(403).json({ errorCode: "C007" });
      return;
    }

    const delete_done = await Comment.deleteOne({ _id: commentId });

    if (delete_done.deletedCount === 0) {
      res.status(401).json({ errorCode: "C008" });
      return;
    }

    res.status(200).json({ message: "댓글을 삭제하였습니다." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
