const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to',url)

mongoose.connect( url , { family:4 }).then(() => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB',error.message)
})

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true
  },
  number:{
    type:String,
    required:true,
    validate:{
      validator:function(value){
        // validate for length
        if(value.length<8) return false
        // validate for xx-xxxxxx or xxx-xxxxxxx format
        return /^\d{2,3}-\d+$/.test(value)
      },
      message:props => `${props.value} is not a valid phone number. Format must be XX-XXXXXXX or XXX-XXXXXXX`
    }
  }
})

personSchema.set('toJSON', {
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)