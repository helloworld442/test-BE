const Post = require("../schemas/posts.js");

getPosts = async (req, res) => {
  try {
    const findPosts = await Post.find({}).sort("-createdAt");

    const allPosts = findPosts.map((post) => {
      return {
        postId: post._id,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        imageUrl: post.imageUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    res.status(200).json({ posts: allPosts });
  } catch (error) {
    res.status(400).json({ errorCode: "P005" });
  }
};

getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const findPost = await Post.findOne({ _id: postId });

    const post = {
      postId: findPost._id,
      userId: findPost.userId,
      nickname: findPost.nickname,
      title: findPost.title,
      imageUrl: findPost.imageUrl,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };

    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ errorCode: "게시글 조회에 실패하였습니다." });
  }
};

createPost = async (req, res) => {
  const { title, imageUrl } = req.body;
  const { userId, nickname } = res.locals.user;

  try {
    if (!req.cookies) {
      // cookie 가 존재하지 않을 경우
      res.status(403).json({ errorCode: "A009" });
      return;
    }

    if (!title) {
      res.status(412).json({ errorCode: "P002" });
      return;
    }

    await Post.create({ userId, nickname, title, imageUrl });

    res.status(201).json({ message: "게시글을 작성에 성공하였습니다." });
  } catch (error) {
    res.status(400).json({ errorCode: "P004" });
  }
};

updatePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const { title } = req.body;

  try {
    if (!req.cookies) {
      res.status(403).json({ errorCode: "A009" });
      return;
    }

    if (!title) {
      res.status(412).json({ errorCode: "P002" });
      return;
    }

    const update_target = await Post.findOne({ _id: postId });

    if (userId !== update_target.userId) {
      res.status(403).json({ errorCode: "P007" });
      return;
    }

    const updatedAt = new Date();
    updatedAt.setHours(updatedAt.getHours() + 9);

    const update_done = await Post.updateOne(
      { _id: postId },
      { $set: { title, updatedAt } }
    );

    if (update_done.modifiedCount === 0) {
      res.status(401).json({ errorCode: "P008" });
      return;
    }

    res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    res.status(400).json({ errorCode: "P009" });
    console.error(error);
  }
};

deletePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  try {
    if (!req.cookies) {
      res.status(403).json({ errorCode: "A009" });
      return;
    }

    const delete_target = await Post.findOne({ _id: postId });

    if (!delete_target) {
      res.status(404).json({ errorCode: "P006" });
      return;
    }

    if (userId !== delete_target.userId) {
      res.status(403).json({ errorCode: "P007" });
      return;
    }

    const delete_done = await Post.deleteOne({ _id: postId });

    if (delete_done.deletedCount === 0) {
      res.status(401).json({ errorCode: "P008" });
      return;
    }

    res.status(200).json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    res.status(400).json({ errorCode: "P009" });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
