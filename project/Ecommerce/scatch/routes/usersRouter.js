const exp = require("express");
const router = exp.Router();

router.get("/", (req, res) => {
    res.send("Users Router");
});

module.exports = router;
