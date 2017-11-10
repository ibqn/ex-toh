import mongoose, { Schema } from 'mongoose'


const HeroSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

export const Hero = mongoose.model('hero', HeroSchema)
