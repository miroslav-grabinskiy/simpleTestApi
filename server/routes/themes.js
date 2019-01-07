const express = require("express");
const router = express.Router();

const ThemeController = require("../../controllers/ThemeController");
const themeController = new ThemeController();

router.post('/theme', (req, res, next) => themeController.addTheme(req, res, next));
router.get('/theme/:themeId', (req, res, next) => themeController.getTheme(req, res, next));

router.post('/theme/:themeId/yes', (req, res, next) => themeController.voteThemeYes(req, res, next));
router.post('/theme/:themeId/no', (req, res, next) => themeController.voteThemeNo(req, res, next));

module.exports = router;