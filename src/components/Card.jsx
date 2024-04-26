import { Link } from "react-router-dom";
import sithOrderImage from '../assets/sithOrder.png';
import separatistImage from '../assets/separatist.png';
import rebelsImage from '../assets/rebelAlliance.png';
import jediOrderImage from '../assets/jediOrder.png';
import galacticRepublicImage from '../assets/galacticRepublic.png';
import galacticEmpireImage from '../assets/galacticEmpire.png';
import '../styles/card.css'

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

    let allianceImage;
    switch (alliance) {
        case "sithOrder":
            allianceImage = sithOrderImage;
            break;
        case "separatist":
            allianceImage = separatistImage;
            break;
        case "rebelAlliance":
            allianceImage = rebelsImage;
            break;
        case "jediOrder":
            allianceImage = jediOrderImage;
            break;
        case "galacticRepublic":
            allianceImage = galacticRepublicImage;
            break;
        case "galacticEmpire":
            allianceImage = galacticEmpireImage;
            break;
        default:
            allianceImage = null; // Or you can provide a default image
            break;
    }

    return (
        <div className="CardContainer">
            {allianceImage && <img src={allianceImage} alt={alliance} width="100" height="100" />}
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