
const DetailedCard = ({title, textBody, alliance, created_at, votes}) => {

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
            <h1>Galactic Discussion: What is being discussed here?</h1>
            <h2>{alliance}</h2>
            <h2>{title}</h2>
            <h3>{textBody}</h3>
            <h3>Votes: {votes}</h3>
            <h5>Created at: {formattedCreatedAt}</h5>
        </div>
    )
}

export default DetailedCard;