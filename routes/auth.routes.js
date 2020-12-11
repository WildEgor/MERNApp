const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/user')
const router = Router()

// /api/auth
router.post(
    '/register',
    [
        check('email', 'Incorrect e-mail!').isEmail(),
        check('password', 'Incorrect password')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect reg data"
                })
            }
            const { email, password } = req.body

            const condidate = await User.findOne({ email })

            if (condidate)
                return res.status(400).json({ message: 'User exist!' })
            
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email: email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: "User created" })

        } catch(e){
            res.status(500).json('Smt goes wrong, try again')
        }
})

// /api/auth
router.post(
    '/login',
    [
        check('email', 'Enter correct e-mail').normalizeEmail().isEmail(),
        check('password', 'Enter correct password').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect login data"
                })
            }
            
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user)
                return res.status(400).json({ message: 'User did found' })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Wrong password' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({
                token, 
                userId: user.id
            })

        } catch(e){
            res.status(500).json('Smt goes wrong, try again')
        }
})


module.exports = router