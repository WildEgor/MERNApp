const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('localport') || 5000
const mongoUri = config.get('mongoDBUri')

const dbConn = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}!`)
        })
    } catch(e) {
        console.log('Server message', e.message)
        process.exit(1)
    }
}

dbConn()

