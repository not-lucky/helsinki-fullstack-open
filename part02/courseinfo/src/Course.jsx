const Part = ( { part, exercise } ) => {
  return (
    <p>
      { part } { exercise }
    </p>
  );
};


const Header = ( { course } ) => {
  return (
    <h2>{ course }</h2>
  );
};

const Content = ( { parts } ) => {
  return (
    <div>
      { parts.map(
        part =>
          <Part key={ part.id } part={ part.name } exercise={ part.exercises } />
      ) }
    </div>
  );
};

const Total = ( { parts } ) => {

  const sum = parts.reduce( ( acc, part ) => acc + part.exercises, 0 );

  return (
    <b>Total number of exercises { sum }</b>
  );
};


const Course = ( { course } ) => {
  return (
    <div>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  );
};

export default Course;
