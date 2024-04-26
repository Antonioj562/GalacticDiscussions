import { useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import '../styles/updatepost.css'

const UpdatePost = () => {
    let {id} = useParams();
    const [post, setPost] = useState({
        title: "",
        textBody: "",
        alliance: "",
        createdBy: "",
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Posts')
            .select("*")
            .eq('id', id)
            setPost(data[0])
        }
        fetchPosts();
    }, []);

    const updatePost = async (event) => {
        event.preventDefault();
        console.log("Updating post:", post);
        try {
            const updatedTitle = post.title;
            const updatedTextBody = post.textBody;
            const updatedAlliance = post.alliance;
    
            await supabase
                .from('Posts')
                .update({
                    title: updatedTitle,
                    textBody: updatedTextBody,
                    alliance: updatedAlliance
                    })
                .eq('id', id);
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    return (
        <div className="updateContainer">
            <h1>Update Your Galactic Thread</h1>
            <img className="starwarsImg" />
            <form>
                <label>Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    style={{ resize: "none", borderRadius: "10px", padding: "5px" }}
                /><br />

                <label>Body</label><br />
                <textarea
                    rows="10"
                    cols="50"
                    name="textBody"
                    value={post.textBody}
                    onChange={handleChange}
                    style={{ resize: "none", borderRadius: "10px", padding: "10px" }}
                />

                <br/>
                <label>Alliance</label><br />
                <select
                    id="alliance"
                    name="alliance"
                    value={post.alliance} 
                    onChange={handleChange}
                >
                    <option value="">select..</option>
                    <option value="galacticEmpire">Galactic Empire</option>
                    <option value="galacticRepublic">Galactic Republic</option>
                    <option value="jediOrder">Jedi Order</option>
                    <option value="rebelAlliance">Rebel Alliance</option>
                    <option value="sithOrder">Sith Order</option>
                    <option value="separatist">Separatist</option>
                </select>

                <input type="submit" value="Update" onClick={updatePost} />
            </form>
        </div>
    );
};

export default UpdatePost;
