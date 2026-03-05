const Total = ({ parts }) => {

  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <h3>Total of {total} exercises </h3>;
};

export default Total;
