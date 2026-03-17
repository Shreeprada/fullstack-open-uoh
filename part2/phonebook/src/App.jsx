import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import phoneService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((result) => {
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
        });
      }
    } else {
      const newObj = { name: newName, number: number };
      phoneService.add(newObj).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNumber("");
      });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRemove = (id) => {
    if (confirm("Delete this name?")) {
      phoneService.remove(id).then((status) => {
        if (status === 200) {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
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
