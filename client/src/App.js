import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react'
import Card from './components/card/Card';

import './App.css'
import Input from './components/input/Input';

const ALL_MUSICIANS = gql`
  query Musicians {
    musicians {
      name
      id
      imageUrl
    }
  }
`;

const ADD_MUSICIAN = gql`
  mutation addMusician($input: NewMusician!) {
    addMusician(input: $input) {
      name
      id
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
  const { loading, error, data } = useQuery(ALL_MUSICIANS);
  const [addMusician, newMusician] = useMutation(
    ADD_MUSICIAN,
    {
      update(cache, { data: { addMusician } }) {
        const { musicians } = cache.readQuery({ query: ALL_MUSICIANS })
        cache.writeQuery({
          query: ALL_MUSICIANS,
          data: { musicians: musicians.concat(addMusician) }
        })
      }
    }

  );


  const handleChange = ({ target: { value, name } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitNewMusician = () => {
    addMusician({
      variables: { input: formData },
      optimisticResponse: {
        __typename: "Mutation",
        addMusician: {
          __typename: "Musician",
          name: formData.name,
          id: `${Math.random()}`,
          imageUrl: formData.imageUrl,
        }
      }
    }
    )

    setFormData(initFormState)
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
