const fs = require("fs");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.isLoggedIn, (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

router.get("/registerD", (req, res) => {
  res.render("registerDonor");
});

router.get("/registerC", (req, res) => {
  res.render("registerCollector");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  const tempCard = fs.readFileSync(
    `${__dirname}/../views/templates/template-card.html`,
    "utf-8"
  );
  const output1 = fs.readFileSync(
    `${__dirname}/../views/profileC.hbs`,
    "utf-8"
  );
  const cards = tempCard + tempCard + tempCard;
  const output = output1.replace("{%%Card%%}", cards);
  if (req.user) {
    if (req.type === "donor") {
      console.log(req.user);
      //   res.end("profileC", {
      //     user: req.user,
      //   });
      res.end(output);
    } else {
      console.log(req.user.name);
      //   res.render("profileC", {
      //     user: req.user,
      //   });
      res.end(output);
    }
  } else {
    console.log("Token does not found");
    res.redirect("/login");
  }
});

module.exports = router;
