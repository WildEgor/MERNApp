const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    if (req.method == 'OPTIONS')
        return next
    
    try {
        const token = req.headers.authorization.split(' ')[1] 

        console.log('Token = ', token);

        if(!token)
            return res.status(401).josn({ message: 'No auth' })  
        
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
        
    } catch (error) {
        return res.status(401).josn({ message: 'No auth' })  
    }
}

module.exports = auth