import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import phoneService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [success,setSuccess]=useState(null);
  const [error,setError]=useState(null);

  const baseUrl='/api/persons'

  useEffect(() => {
    axios.get(baseUrl).then((result) => {
      setPersons(result.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      if (
        confirm(
          `${newName} is already on the phonebook. Replace old number with new number?`,
        )
      ) {
        const updatePerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase(),
        );
        const updated = { ...updatePerson, number: number };

        phoneService.update(updated.id, updated).then((data) => {
          setPersons(
            persons.map((person) => (person.id === updated.id ? data : person)),
          );
          setNewName("");
          setNumber("");
          setSuccess(`${updated.name} number changed successfully`);
          setTimeout(()=>{
            setSuccess(null);
          },2000);
        })
        .catch(()=>{
          setError(`Information of ${updated.name} has already been removed from the server`);
          setTimeout(()=>{
            setError(null)
          },2000)
        })
      }
    } else {
      const newObj = { name: newName, number: number };
      phoneService.add(newObj).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNumber("");
        setSuccess(`${data.name} added successfully`);
        setTimeout(()=>{
            setSuccess(null);
          },2000);
      }).catch((error)=>{
        setError(error?.response?.data?.error)
        setTimeout(()=>{
          setError(null)
        },2000)
      })
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRemove = (id) => {
    if (confirm("Delete this name?")) {
      phoneService.remove(id).then((status) => {
        if (status === 204) {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setSuccess(`Name deleted successfully`);
          setTimeout(()=>{
            setSuccess(null);
          },2000);
        }
      });
    }
  };

  const shown = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} type="error"/>
      <Notification message={success} type="success"/>
      <Filter value={search} onChange={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        setName={(e) => setNewName(e.target.value)}
        number={number}
        setNumber={(e) => setNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons shown={shown} handleRemove={handleRemove}/>
    </div>
  );
};

export default App;
