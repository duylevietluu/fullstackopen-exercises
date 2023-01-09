const Header = ({course}) => <h3>{course}</h3>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => ( parts.map(part=> (<Part key={part.id} part={part} />)) )

const Total = ({parts}) => {
  let sum = parts.reduce((a, b) => (a + b.exercises), 0)
  return <strong>Totaling {sum} exercises</strong>
}

const Course = ({course}) => {
  return (<>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </>)
}

export default Course