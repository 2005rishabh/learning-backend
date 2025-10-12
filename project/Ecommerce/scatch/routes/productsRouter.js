const exp = require("express");
const router = exp.Router();

router.get("/", (req, res) => {
    res.send("Products Router");
});

module.exports = router;
