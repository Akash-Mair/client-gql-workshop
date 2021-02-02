import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react'
import Card from './components/card/Card';

import './App.css'
import Input from './components/input/Input';
import NavBar from './components/navbar/NavBar';

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
      imageUrl
	  id
    }
  }
`

const App = () => {
	const initFormState = {
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
					id: `${Math.floor(Math.random() * 1000)}`,
					imageUrl: formData.imageUrl,
				}
			}
		}
		)

		setFormData(initFormState)
	}

	if (loading) return <p>Loading....</p>

	if (error || newMusician.error) return <p>Error :(</p>

	return (
		<div className="App">
			<NavBar />
			<div className="musicians">
				{data.musicians.map(x => <Card musician={x} />)}
			</div>
			<div className="add-musician">
				<h2 className="add-musician-title">Add a new musician</h2>
				<div className="add-musician-form">
					<Input
						labelName="Name"
						inputValue={formData.name}
						inputName="name"
						handleChange={handleChange} />
					<Input
						labelName="Image Url"
						inputValue={formData.imageUrl}
						inputName="imageUrl"
						handleChange={handleChange} />
					<button
						className="add-musician-button"
						onClick={submitNewMusician}>
						Submit
					</button>
				</div>
			</div>
		</div >
	);
}

export default App;
