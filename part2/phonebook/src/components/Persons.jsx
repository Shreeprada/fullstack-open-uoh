import Person from "./Person";

const Persons=({shown,handleRemove})=>{
    return(<>
    {shown.map((person)=><Person key={person.name} person={person} onClick={()=>handleRemove(person.id)}/>)}
    </>)
}

export default Persons;