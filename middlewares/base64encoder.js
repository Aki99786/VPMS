const express = require('express');
const app = express();

// Base64 encoding middleware
const base64EncodeMiddleware = (req, res, next) => {
  const apiUrl = req.params.url; // Extract the API URL from the request parameters

  // Convert the API URL to base64 encoding
  const base64Url = Buffer.from(apiUrl).toString('base64');

  req.base64Url = base64Url; // Attach the base64Url to the request object

  next();
};

module.exports = base64EncodeMiddleware;