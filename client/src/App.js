import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react'
import Card from './components/card/Card';

import './App.css'

const MUSICIANS = gql`
  query Musicians {
    musicians {
      name
      id
      grammyWins 
      imageUrl
    }
  }
`;

const ADD_MUSICIAN = gql`
  mutation addMusician($input: NewMusician!) {
    addMusician(input: $input) {
      name
      id
      grammyWins 
      imageUrl
    }
  }

`

const App = () => {
  const initFormState = {
    id: "",
    name: "",
    grammyWins: 0,
    imageUrl: ""
  }

  const [formData, setFormData] = useState(initFormState)
  const { loading, error, data } = useQuery(MUSICIANS);
  const [addMusician, { newMusician }] = useMutation(ADD_MUSICIAN);


  const handleChange = ({ target: { value, name } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitNewMusician = () => {
    addMusician({
      variables: { input: formData },
    })
  }

  if (loading) return <p>Loading....</p>

  if (error) return <p>Error :(</p>

  return (
    <div className="App">
      <div className="musicians">
        {
          data.musicians.map(x => <Card musician={x} />)
        }
      </div>
      <div>
        <p>Add new musician</p>
        <label>
          Id
          <input value={formData.id} name="id" onChange={handleChange} />
        </label>
        <label>
          Name
          <input value={formData.name} name="name" onChange={handleChange} />
        </label>
        <label>
          Grammy Wins
          <input value={formData.grammyWins} name="grammyWins" onChange={handleChange} />
        </label>
        <label>
          Image Url
          <input value={formData.imageUrl} name="imageUrl" onChange={handleChange} />
        </label>
        <button onClick={submitNewMusician}>Submit</button>
      </div>
    </div>
  );
}

export default App;
