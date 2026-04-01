const express=require('express')

var morgan=require('morgan')

const app=express()

// middlewares
app.use(express.json())
morgan.token('body',(req)=>{
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

let persons=[
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
]

app.get('/api/persons',(request,response)=>{
        response.json(persons)
})

app.get('/info',(request,response)=>{
    const length=persons.length;
    const date=new Date();
    response.send(`<div><p>Phonebook has info for ${length} people</p>
        <p>${date}</p></div>`)
})

app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    const person=persons.find(p=>p.id===id)
    if(person){
        response.status(200).json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id=request.params.id
    persons=persons.filter(p=>p.id!==id)
    response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
    const newPerson = request.body;
    if (!newPerson.name || !newPerson.number) {
      return response.status(400).json({ error: "Missing body content" });
    }
    if (
        persons.find(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
      )
    ) {
      return response.status(400).json({ error: "This name already exists" });
    }
      const id = Math.floor(Math.random() * (10000 - 100 + 1)) + 100; // range 100-10000
      newPerson.id = id;
      persons = persons.concat(newPerson);
      response.json(newPerson);

})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})