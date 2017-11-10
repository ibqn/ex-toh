import mongoose from 'mongoose'


const initDb = () => {
  mongoose.Promise = global.Promise
}

export default initDb
