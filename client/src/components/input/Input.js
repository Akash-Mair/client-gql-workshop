import './input.css'


const Input = ({ labelName, inputValue, inputName, handleChange }) => {
    return (
        <div className="input">
            <label>
                {labelName}
            </label>
            <input value={inputValue} name={inputName} onChange={handleChange} />
        </div>
    )
}

export default Input
