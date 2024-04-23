import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import DetailedCard from '../components/DetailedCard.jsx';

const DetailedPost = () => {
    let {id} = useParams();
    const [posts, setPosts] = useState([]);
    let [votes, setVotes] = useState();

    useEffect( () => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select("*")
                .eq('id', id);
            setPosts(data[0]);
            setVotes(data[0].votes);
        }
        fetchPosts();
    }, [])

    const updateVote = async (newVotes) =>{
        try{
            await supabase
                .from('Posts')
                .update({ votes:newVotes })
                .eq('id', id)
            setVotes(newVotes)
        } catch (error){
            console.error('Error updating vote:', error.message);
        }
    }

    const incrementVote = async () => {
        const newVotes = votes + 1;
        setVotes(newVotes);
        console.log("before", votes);
        updateVote(newVotes);
        console.log("after",votes)
    }

    const decrementVote = async () => {
        const newVotes = votes - 1;
        setVotes(newVotes);
        updateVote(newVotes);
    }

    return (
        <div>
            <DetailedCard key={posts && posts.id}
                id={posts && posts.id}
                title={posts&& posts.title}
                textBody={posts && posts.textBody}
                alliance={posts && posts.alliance}
                votes={posts&& posts.votes}
                created_at={posts&& posts.created_at}/>
            <br></br>
            <div className='voteContainer'>
                <button onClick={incrementVote}>Upvote</button>
                <h4>Votes: {votes}</h4>
                <button onClick={decrementVote}>Downvote</button>
            </div>
            <h3>Future delete and edit post option here</h3>
            <h3>Comment Section:</h3>
            
        </div>
    )
}

export default DetailedPost;