import { CoursePart } from "../App"

const Part = ( {part}: { part: CoursePart } ) => {
  switch (part.type) {
    case "normal":
      return <div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div><em>{part.description}</em></div>
      </div>
    case "groupProject":
      return <div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div>project exercises {part.groupProjectCount}</div>
      </div>
    case "submission":
      return <div>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div><em>{part.description}</em></div>  
        <div>submit to {part.exerciseSubmissionLink}</div>
      </div>
  }

  
}

export default Part