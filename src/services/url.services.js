const validUrl = require('valid-url');
const shortid = require('shortid');
const URL = require('../models/url');
const apiResponse = require('../utils/response');

const shortenURL = async (url) => {
  if (!validUrl.isUri(url)) {
    return apiResponse(400, 'invalid url');
  }

  const existingOriginUrl = await URL.findOne({
    urlOrigin: url,
  });

  if (existingOriginUrl) {
    const data = {
      shortenUrl: `${process.env.BASE_URL}/${existingOriginUrl.shortenUrl}`,
    };
    return apiResponse(200, 'url already been shorten', data);
  }

  let shortId;
  let existingId;

  do {
    shortId = shortid.generate();
    existingId = await URL.findOne({ shortenUrl: shortId });
  } while (existingId);

  const newUrl = new URL({ urlOrigin: url, shortenUrl: shortId });
  await newUrl.save();

  const data = {
    shortenUrl: `${process.env.BASE_URL}/${shortId}`,
  };

  return apiResponse(201, 'success', data);
};

const redirectUrl = async (url) => {
  const existingUrl = await URL.findOne({
    shortenUrl: url,
  });

  if (!existingUrl) {
    return apiResponse(404, 'url not found');
  }

  return apiResponse(200, 'success', existingUrl.urlOrigin);
};

module.exports = {
  shortenURL,
  redirectUrl,
};
