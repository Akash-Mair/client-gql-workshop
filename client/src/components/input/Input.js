


const Input = ({ labelName, inputValue, inputName, handleChange }) => {
    return (
        <label>
            {labelName}
            <input value={inputValue} name={inputName} onChange={handleChange} />
        </label>
    )
}

export default Input
