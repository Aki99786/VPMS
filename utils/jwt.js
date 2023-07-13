const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./secretKey');

// function generateToken(payload) {
//   const token = jwt.sign(payload, SECRET_KEY);
//   console.log(generateToken);
//   return token;
// }


// module.exports = {

//   generateToken,
// };
// const jwt = require("jsonwebtoken");

const generateToken = id => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "5d" });
};

module.exports = generateToken;

