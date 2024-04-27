import { useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import sithOrderImage from '../assets/sithOrder.png';
import separatistImage from '../assets/separatist.png';
import rebelsImage from '../assets/rebelAlliance.png';
import jediOrderImage from '../assets/jediOrder.png';
import galacticRepublicImage from '../assets/galacticRepublic.png';
import galacticEmpireImage from '../assets/galacticEmpire.png';


const DetailedCard = ({id, title, textBody, alliance, created_at, votes, postSecret}) => {

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
    const [deleteInput, setDeleteInput] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleInputChange = (event) => {
        setDeleteInput(event.target.value);
        setErrorMessage(""); 
    };

    const handleDelete = () => {
        if (deleteInput === postSecret) {
            setDeleteInput("");
            deletePost();
        } else {
            setErrorMessage("Incorrect secret. Please try again.");
        }
    };

    const deletePost = async () => {
        try {
            const { error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', id)
            if (error) {
                throw error;
            }
            console.log('Post deleted successfully');
        } catch (error){
            console.error('Error deleting Post:', error.message);
        }
    }

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
            allianceImage = null; 
            break;
    }

    return (
        <div className="CardContainer">
            <h1>Galactic Discussion: What is being discussed here?</h1>
            {allianceImage && <img src={allianceImage} alt={alliance} width="100" height="100" />}
            <h2>{title}</h2>
            <h3>{textBody}</h3>
            <h5>Created at: {formattedCreatedAt}</h5>

            {deleteInput === postSecret && (
                <Link to={`/UpdatePost/${id}?secret=${postSecret}`}>Update Post</Link>
            )}
            <br></br>

            <div>
                <input
                    type="text"
                    value={deleteInput}
                    onChange={handleInputChange}
                    placeholder="Enter secret to delete/update"
                />
                <button onClick={handleDelete}>Delete Post</button>
                {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
            </div>
        </div>
    )
}

export default DetailedCard;