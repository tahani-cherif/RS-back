const express = require("express");

const { getDashboardCount } = require("../services/dashboardService");

const router = express.Router();

router.route("/").get(getDashboardCount);

module.exports = router;
