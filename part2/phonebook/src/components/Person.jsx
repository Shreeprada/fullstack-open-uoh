const Person=({person,onClick})=>{
    return(<>
        <p>{person.name} {person.number} <button onClick={onClick}>delete</button></p>
    </>)
}

export default Person;