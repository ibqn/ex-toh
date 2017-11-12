import mongoose, { Schema } from 'mongoose'


const heroSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

heroSchema.virtual('id').get(function() {
  return this._id
})

heroSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, /*options*/) {
    delete ret.__v;
    delete ret._id;
  },
})

// heroSchema.set('toObject', { virtuals: true })

export const Hero = mongoose.model('hero', heroSchema)
