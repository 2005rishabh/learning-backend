const exp = require("express");
const router = exp.Router();

router.get("/", (req, res) => {
    res.send("Owners Router");
});

module.exports = router;
