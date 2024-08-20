const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

module.exports = class UserController {
  static async googleLogin(req, res) {
    try {
      console.log(req.body, "<<CEKK");
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience:
          "622140840189-o5sk7mltpbipqsrfg2volh0kklfgu8j8.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      let userName = payload.name;

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          name: payload.name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });
      const token = signToken({ id: user.id });
      res
        .status(created ? 201 : 200)
        .json({ access_token: token, name: userName });
    } catch (error) {
      console.log(error);
    }
  }
};
