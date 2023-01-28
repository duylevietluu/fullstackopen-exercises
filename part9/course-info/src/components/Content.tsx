import { CoursePart } from "../App"
import Part from "./Part"

const Content = ( {parts}: { parts: CoursePart[] } ) => {
  return (
    <>
      {parts.map((part, id) => <Part key={id} part={part} />)}
    </>
  )
}

export default Content