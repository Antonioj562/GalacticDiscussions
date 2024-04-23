
const DetailedCard = ({title, textBody, alliance}) => {

    return (
        <div className="CardContainer">
            <h2>{alliance}</h2>
            <h2>{title}</h2>
            <h3>{textBody}</h3>
        </div>
    )
}

export default DetailedCard;