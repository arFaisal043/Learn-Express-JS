const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();


// ______ REGISTRATION API _________________

/* /api/auth/register */
router.post('/register', authController.registerUser);



// ______ TEST API _________________

router.get('/test', (req, res) => {
    console.log("Cookies: ", req.cookies);
    
    res.json({
        message: "Test API Route",
        cookies: req.cookies
    })
})


module.exports = router;