
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../utils/secretKey');
const User = require("../models/adminModel");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In." });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, SECRET_KEY, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "You session has been expired." });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			// We make user data accessible
			req.user = userdata;
			next();
		});
	});
};

// const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../utils/secretKey');

// /**
//  * Middleware to authenticate a token in the request headers.
//  */
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const [bearer, token] = authHeader.split(' ');

//   if (bearer !== 'Bearer' || !token) {
//     return res.status(401).json({ message: 'Invalid token format' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     console.log(token);
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// /**
//  * Middleware to authorize a user based on their roles.
//  * @param {Array} roles - Required roles for authorization.
//  */
// function authorizeToken(roles) {
//   return function(req, res, next) {
//     const userRoles = req.user.roles;
//     console.log(authorizeToken);
//     if (!userRoles || !Array.isArray(userRoles)) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     for (let i = 0; i < roles.length; i++) {
//       if (userRoles.includes(roles[i])) {
//         return next();
//       }
//     }

//     return res.status(403).json({ message: 'Forbidden' });
//   };
// }

// module.exports = {
//   authenticateToken,
//   authorizeToken,
// };
