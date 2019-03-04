const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const schema = new Schema({
  username: String, //用户名
  email: { type: String, unique: true, lowercase: true }, // 邮箱
  password: String, // 密码
});

schema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

schema.methods.compare = async function(candidate) {
  return await bcrypt.compare(candidate, this.password);
};

const User = mongoose.model('user', schema);

module.exports = User;