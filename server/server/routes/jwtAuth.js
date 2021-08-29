
const router = require ("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../util/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");


//registering

router.post("/register",validinfo, async(req,res) => {
   
    try{
       
        const { email, name, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
          ]);
          if(user.rows.length !==0) {
              return res.status(401).send("User already exist");
          
          }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);
        
      
         
          const newUser = await pool.query(
              "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
              [name, email, bcryptPassword]
              
          ); 
       
         // res.json(newUser.rows[0]);
          const token = jwtGenerator(newUser.rows[0].user_id);
         return res.json({token});
        }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.post("/login",validinfo, async(req,res) => {
  debugger; 
    try{
        //1.destructure the req body
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
          ]);
          if (user.rows.length === 0) {
            return res.status(403).json("Password or email is incorrect");
          }

          const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
          );
          
          if (!validPassword) {
            return res.status(403).json("Password or email is incorrect");
          }

          const jwtToken = jwtGenerator(user.rows[0].user_id);
          return res.json({ jwtToken });
          
  

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
  });
    router.get("/is-verify", authorization,async(req, res) => {
      try{
        res.json(true);
      } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
      
    
});

module.exports = router;