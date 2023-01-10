const Persons = ({persons, removePerson}) => {
    return persons.map( person => 
        <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>remove</button>
        </div> )
}

export default Persons