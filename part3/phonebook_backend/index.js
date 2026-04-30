require('dotenv').config()

const express=require('express')

const Person=require('./models/phonebook')

var morgan=require('morgan')

const app=express()

// middlewares loaded in order
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body',(req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/*let persons=[
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
] */

app.get('/api/persons',(request,response,next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})

app.get('/info',(request,response,next) => {
  /* const length=persons.length;
    const date=new Date();
    response.send(`<div><p>Phonebook has info for ${length} people</p>
        <p>${date}</p></div>`) */
  Person.countDocuments().then(count => {
    const date=new Date()
    response.send(`<div><p>Phonebook has info for ${count} people</p><p>${date}</p></div>`)
  }).catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next) => {
  /*const id=request.params.id
  const person=persons.find(p=>p.id===id)
    if(person){
      response.status(200).json(person)
    }else{
      response.status(404).end()
    }*/

  Person.findById(request.params.id).then(person => {
    if(!person){
      response.status(404).end()
    }
    response.status(200).json(person)
  }).catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response, next) => {
  /*const id=request.params.id
  persons=persons.filter(p=>p.id!==id)
  response.status(204).end()*/

  Person.findByIdAndDelete(request.params.id).then( () => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons',(request,response,next) => {
  const newPerson = request.body
  if (!newPerson.name || !newPerson.number) {
    return response.status(400).json({ error: 'Missing body content' })
  }
  /*if (
      persons.find(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
      )
    ) {
      return response.status(400).json({ error: "This name already exists" });
    } */
  /* const id = Math.floor(Math.random() * (10000 - 100 + 1)) + 100; // range 100-10000
    newPerson.id = String(id); */
  /*persons = persons.concat(newPerson);
  response.json(newPerson);*/

  const person= new Person({
    name:newPerson.name,
    number:newPerson.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request,response, next) => {
  const { name,number } = request.body
  Person.findById(request.params.id).then(person => {
    if(!person){
      return response.status(404).end()
    }
    person.name=name
    person.number=number
    // chained promise
    return person.save().then(updatedPerson => {
      response.json(updatedPerson)
    })
  }).catch(error => next(error))
})

//unknown endpoint handler
const unknownEndpoint=(request,response) => {
  response.status(404).send({ error:'Unknown endpoint' })
}
// should be called at the end of all route handlers
app.use(unknownEndpoint)

// error handler middleware
const errorHandler=(error,request,response,next) => {
  console.error(error.message)

  if(error.name==='CastError'){
    return response.status(400).send({ error:'malformatted id' })
  }else if(error.name==='ValidationError') {
    return response.status(400).json({ error:error.message })
  }
  next(error)

}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`Server running on Port ${PORT}`)
})