const urlServices = require('../services/url.services');

const postShortenUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const serviceResponse = await urlServices.shortenURL(url);

    res.status(serviceResponse.code).send(serviceResponse.response);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'internal server error',
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const serviceResponse = await urlServices.redirectUrl(url);

    if (serviceResponse.code !== 200) {
      res.status(serviceResponse.code).send(serviceResponse.response);
    }
    res.redirect(serviceResponse.response.data);
  } catch (error) {
    res.status(500).send({
      message: 'internal server error',
    });
  }
};

module.exports = {
  postShortenUrl,
  redirectUrl,
};
