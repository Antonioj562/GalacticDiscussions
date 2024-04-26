import { supabase } from "../client";
import { useState, useEffect } from "react";
import Card from '../components/Card.jsx'
import '../styles/homefeed.css'

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect (() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    return (
        <div className="HomeFeedContainer">
            <h1>Galactic Discussions</h1>
            <br></br>
            <div className="cardItem">
                {
                    posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card key={post.id} 
                            id={post.id} 
                            title={post.title} 
                            textBody={post.textBody} 
                            alliance={post.alliance}
                            created_at={post.created_at}
                            votes={post.votes}
                            />
                    ) : <h2>{'No post created.'}</h2>
                }
            </div>
        </div>
    )
}

export default HomeFeed;