import { supabase } from "../client";
import { useState, useEffect } from "react";
import Card from '../components/Card.jsx'

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect (() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('Posts')
                .select();
            setPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, []);

    return (
        <div className="HomeFeedContainer">
            <h2>Galactic Discussions</h2>
            <div className="cardItem">
                {
                    posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card key={post.id} title={post.title} textBody={post.textBody} alliance={post.alliance}/>
                    ) : <h2>{'No post created.'}</h2>
                }
            </div>
        </div>
    )
}

export default HomeFeed;