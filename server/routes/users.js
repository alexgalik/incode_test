const express = require("express");
const User = require("../models/userModel");
const parseErrors = require("../utils/parseErrors");
const authenticate =require("../middlewares/authenticate");

const router = express.Router();

router.get("/current_user", authenticate, (req, res) => {
    res.json({
      user: {
        email: req.currentUser.email
      }
    });
  });

router.post("/", (req, res) => {
    console.log(req.body)
    const {
        email,
        password
    } = req.body.user;
    User.findOne({
        email
    }).then(user => {
        if (user) {
            if (user.isValidPassword(password)) {
                res.json({
                    user: user.toAuthJSON()
                });
            } else {
                res.json({
                    errors: {
                        global: "Invalid password"
                    }
                });
            }
        } else {
            const user = new User({
                email
            });
            user.setPassword(password);
            user
                .save()
                .then(userRecord => {
                    res.json({
                        user: userRecord.toAuthJSON()
                    });
                })
                .catch(err => res.status(400).json({
                    errors: parseErrors(err.errors)
                }));
        }
    })

});

module.exports = router;