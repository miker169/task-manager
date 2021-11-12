const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL

mongoose.connect(connectionURL, {
    // tlsCAFile: 'rds-combined-ca-bundle.pem',
    useNewUrlParser: true
})
