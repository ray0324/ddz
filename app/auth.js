const User = require('./models/user');
const jwt = require('jwt-simple');
const conf = require('./conf');

function tokenForUser(user) {
  return jwt.encode({ sub: user.id, iat: Date.now() }, conf.APP_SECRET);
}

async function auth(ctx) {
  const { username, email, password } = ctx.request.body;
  // 注册
  if (/^\/register\/?$/.test(ctx.request.path)) {
    const user = await User.findOne({ email });
    if (user) throw new Error('用户已经存在!');
    const newUser = new User({ username, email, password });
    await newUser.save();
    return ctx.body = {
      token: tokenForUser(user)
    };
  }

  // 登录
  if (/^\/login\/?$/.test(ctx.request.path)) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('用户不存在!');
    // 比较密码
    const isMatch = await user.compare(password);
    if (!isMatch) throw new Error('用户名和密码不匹配!');
    return ctx.body = {
      token: tokenForUser(user)
    };
  }
};

module.exports = auth