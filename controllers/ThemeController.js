const ThemeModel = require("../models/ThemeModel");
const themeModel = new ThemeModel();

class ThemeController {
  constructor() {}
  
  async addTheme(req, res, next) {
    try {
      const themeResult = await themeModel.create(req.body);

      res.send({
        error: null,
        themeId: themeResult.id
      });
    } catch(err) {
      if (err.name === "SequelizeValidationError") {
        if (
          err.errors.length === 1 &&
          err.errors[0].message === "Name length cannot be greater than 1024"
        ) {
          return next({error: err.errors[0].message})
        }
      }

      next(err);
    }
  }
  
  async getTheme(req, res, next) {
    const themeId = req.params.themeId;

    try {
      const themeResult = await themeModel.findById(themeId);

      if (!themeResult) {
        return next({code: 404, message: "not found"});
      }

      const theme = {
        name: themeResult.name,
        votes: {
          yes: themeResult.yes,
          no: themeResult.no
        }
      };

      res.json(theme);
    } catch(err) {
      next(err)
    }
  }
  
  async voteThemeYes(req, res, next) {
    const themeId = req.params.themeId;

    try {
      const sequeslizeResult = await themeModel.voteTheme(themeId, "yes");
      const isVoted = sequeslizeResult && sequeslizeResult[0];

      if (!isVoted) {
        return next({code: 404, message: "not found"});
      }

      res.send("OK");
    } catch(err) {
      next(err)
    }
  }
  
  async voteThemeNo(req, res, next) {
    const themeId = req.params.themeId;

    try {
      const sequeslizeResult = await themeModel.voteTheme(themeId, "no");
      const isVoted = sequeslizeResult && sequeslizeResult[0];

      if (!isVoted) {
        return next({code: 404, message: "not found"});
      }

      res.send("OK");
    } catch(err) {
      next(err)
    }
  }
}

module.exports = ThemeController;