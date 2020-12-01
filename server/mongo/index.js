import mongoose from 'mongoose'

console.log(process.env)
export const db = mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

console.log(db)
const { connection } = mongoose
connection.on('error', error => console.error('connection error:', error))
connection.once('open', () => console.log('connection has been estabilished...'))
