import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react'
import Card from './components/card/Card';

import './App.css'
import Input from './components/input/Input';

const MUSICIANS = gql`
  query Musicians {
    musicians {
      name
      id
      # grammyWins 
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
      <div className="add-musician">
        <h2>Add new musician</h2>
        <Input labelName="Id" inputValue={formData.id} inputName="id" handleChange={handleChange} />
        <Input labelName="Name" inputValue={formData.name} inputName="name" handleChange={handleChange} />
        <Input labelName="Image Url" inputValue={formData.imageUrl} inputName="imageUrl" handleChange={handleChange} />
        <button onClick={submitNewMusician}>Submit</button>
      </div>
    </div >
  );
}

export default App;
