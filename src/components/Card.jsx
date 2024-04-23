import { Link } from "react-router-dom";

const Card = ({id, title, textBody, alliance, created_at, votes}) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric', 
        };
        return date.toLocaleDateString('en-US', options);
    }
    const formattedCreatedAt = formatDate(created_at);

    return (
        <div className="CardContainer">
            <h2>{alliance}</h2>
            <h2>{title}</h2>
            <h3>{textBody}</h3>
            <Link to={`/DetailedPost/${id}`}>Detailed View</Link>
            <br></br>
            <h4>Votes: {votes}</h4>
            <h4>{formattedCreatedAt}</h4>
        </div>
    )
}

export default Card;