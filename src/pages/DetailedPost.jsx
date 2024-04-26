import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import DetailedCard from '../components/DetailedCard.jsx';
import '../styles/detailedpost.css';

const DetailedPost = () => {
    let {id} = useParams();
    const [post, setPost] = useState({});
    let [votes, setVotes] = useState();
    const [newComment, setNewComment] = useState('');
    const [newCommentName, setNewCommentName] = useState('');

    useEffect( () => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select("*")
                .eq('id', id);
            setPost(data[0]);
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
        updateVote(newVotes);
    }

    const decrementVote = async () => {
        const newVotes = votes - 1;
        setVotes(newVotes);
        updateVote(newVotes);
    }

    const handleNewCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !newCommentName.trim()) return;
        try {
            console.log(post.comments)
            const updatedComments = [...post.comments, { [newCommentName.trim()]: newComment.trim() }];
            const { data, error } = await supabase
                .from('Posts')
                .update({ comments: updatedComments })
                .eq('id', id);

            if (error) {
                console.error('Error adding comment:', error.message);
                return;
            }

            setPost({ ...post, comments: updatedComments });
            setNewComment('');
            setNewCommentName('');
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <div>
            <DetailedCard key={post && post.id}
                id={post && post.id}
                title={post&& post.title}
                textBody={post && post.textBody}
                alliance={post && post.alliance}
                votes={post&& post.votes}
                created_at={post && post.created_at}
                postSecret={post&& post.postSecret}
                />
            <br></br>

            <div className='voteContainer'>
                <button onClick={incrementVote}>Upvote</button>
                <h4>Votes: {votes}</h4>
                <button onClick={decrementVote}>Downvote</button>
            </div>

            <h3>Comment Section:</h3>
            <div className="addCommentContainer">
                <input
                        type="text"
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        placeholder="Your Name"
                />
                <input
                    type="text"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    placeholder="Add a new comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
                
            </div>

            {post.comments && (
                <div className='postComments'>
                    {post.comments.map((commentObj, index) => (
                        <div key={index}>
                            <p><strong>{Object.keys(commentObj)[0]}:</strong> {Object.values(commentObj)[0]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DetailedPost;