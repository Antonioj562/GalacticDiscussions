import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import DetailedCard from '../components/DetailedCard.jsx';

const DetailedPost = () => {
    let {id} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select("*")
                .eq('id', id);
            setPosts(data[0]);
        }
        fetchPosts();
    }, [])

    return (
        <div>
            <DetailedCard key={posts && posts.id}
                id={posts && posts.id}
                title={posts&& posts.title}
                textBody={posts && posts.textBody}
                alliance={posts && posts.alliance}/>
            <br></br>
            <h3>Comment Section:</h3>
        </div>
    )
}

export default DetailedPost;