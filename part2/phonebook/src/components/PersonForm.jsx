const PersonForm = ({onSubmit,name,setName,number,setNumber}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input
          type="text"
          value={name}
          onChange={setName}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={number}
          onChange={setNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
