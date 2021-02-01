import './card.css'


const Card = ({ musician }) => {
    return (
        <div key={musician.id} className="card">
            <img src={musician.imageUrl} alt="musician" className="card-img" />
            <div className="card-info">
                <p className="card-field">
                    <span>Name:</span>
                    <span>{musician.name}</span>
                </p>
            </div>
        </div >
    )
}

export default Card
