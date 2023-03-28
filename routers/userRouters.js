const router = require("express").Router();
const { userControllers } = require("../controllers") ;

router.get("/", userControllers.getAll);
router.get("/:id", userControllers.getById);
router.post("/", userControllers.addUser);
router.delete("/:id", userControllers.deleteById);
router.patch("/:id", userControllers.editById);

module.exports = router;