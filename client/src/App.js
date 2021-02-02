import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react'
import Card from './components/card/Card';

import Input from './components/input/Input';
import NavBar from './components/navbar/NavBar';

import './App.css'


const App = () => {
	const initFormState = {
		name: "",
		imageUrl: ""
	}

	const [formData, setFormData] = useState(initFormState)


	const handleChange = ({ target: { value, name } }) => {
		setFormData({ ...formData, [name]: value })
	}

	const submitNewMusician = () => {
		setFormData(initFormState)
	}

	return (
		<div className="App">
			<NavBar />
			<div className="musicians">

			</div>
			<div className="add-musician">
				<h2 className="add-musician-title">Add a new musician</h2>
				<div className="add-musician-form">
					<div>
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
					</div>
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
