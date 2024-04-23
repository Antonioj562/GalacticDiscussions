import { Link } from "react-router-dom";

const Card = ({id, title, textBody, alliance}) => {

    return (
        <div className="CardContainer">
            <h2>{alliance}</h2>
            <h2>{title}</h2>
            <h3>{textBody}</h3>
            <Link to={`/DetailedPost/${id}`}>Detailed View</Link>
        </div>
    )
}

export default Card;