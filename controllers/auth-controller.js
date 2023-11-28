const jwt = require("jsonwebtoken");

const User = require("../schemas/user.js");

const checkUser = async (req, res) => {
  const { nickname, password } = req.body;
  const user = await User.findOne({ nickname: nickname });

  try {
    if (!user) {
      res.status(412).json({ errorCode: "A007" });
      return;
    }

    if (password !== user.password) {
      res.status(412).json({ errorCode: "A008" });
      return;
    }

    const token = jwt.sign({ userId: user.userId }, process.env.PRIVATE_KEY);

    res.cookie("permission", `Bearer ${token}`, {
      maxAge: 9000000000,
      httpOnly: true,
    });

    res.status(201).json({ message: "로그인에 성공하셨습니다" });
  } catch (error) {
    res.status(400).json({ errorMessage: "A009" });
  }
};

const createUser = async (req, res) => {
  const { nickname, password } = req.body;

  try {
    if (nickname.length < 3) {
      res.status(412).json({ errorCoe: "A001" });
      return;
    }

    if (password.length < 4) {
      res.status(412).json({ errorCode: "A002" });
      return;
    }

    if (password.includes(nickname) === true) {
      res.status(412).json({ errorCode: "A003" });
      return;
    }

    const checkNickname = await User.findOne({ nickname: nickname });

    if (checkNickname) {
      res.status(412).json({ errorCode: "A005" });
      return;
    }

    await User.create({ nickname, password });

    res.status(201).json({ message: "회원가입에 성공했습니다." });
  } catch (error) {
    res.status(400).json({ errorCode: "A006" });
  }
};

module.exports = {
  checkUser,
  createUser,
};
