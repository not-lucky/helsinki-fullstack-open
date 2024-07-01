
export const Total = ({ parts }) => <h4>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</h4>
