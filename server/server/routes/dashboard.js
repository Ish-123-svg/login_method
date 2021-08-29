const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization,async (req, res) => {
    try{
        
            const user = await pool.query(
                "SELECT user_email FROM users WHERE user_id = $1", [
                req.user
                ]);
    console.log(user.rows[0]);
            res.json(user.rows[0]);
        res.json(req.user);
    
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
});  
module.exports = router;