import { supabase } from "../client";
import { useState } from "react";

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        textBody: "",
        alliance: "",
        createdBy: "",
    });

    const createPost = async (event) => {
        console.log('Testing');
        event.preventDefault();
        try{
            await supabase
                .from('Posts')
                .insert({title: post.title, textBody: post.textBody, alliance: post.alliance, createdBy: post.createdBy});
            console.log("Post Created...")
        } catch (error){
            console.error('Error creating post:', error.message);
        }
    }


    return (
        <div className="createContainer">
            <h1>Create A Galactic Thread</h1>
            <img className="starwarsImg" />
            <form>
                <label>Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title} // Add this line
                    onChange={(e) => setPost({ ...post, title: e.target.value })} // Add this line
                    style={{ resize: "none", borderRadius: "10px", padding: "5px" }}
                    /><br />

                <label>Body</label><br />
                <textarea
                    type="textBox"
                    rows="10"
                    cols="50"
                    name="textBody"
                    className="textBody"
                    value={post.textBody} // Add this line
                    onChange={(e) => setPost({ ...post, textBody: e.target.value })} // Add this line
                    style={{ resize: "none", borderRadius: "10px", padding: "10px" }}
                    />

                <br/>
                <label>Alliance</label><br />
                <select
                    id="alliance"
                    name="alliance"
                    value={post.alliance} // Add this line
                    onChange={(e) => setPost({ ...post, alliance: e.target.value })} // Add this line
                    >
                    <option value="galacticEmpire">Galactic Empire</option>
                    <option value="galacticRepublic">Galactic Republic</option>
                    <option value="jediOrder">Jedi Order</option>
                    <option value="rebelAlliance">Rebel Alliance</option>
                    <option value="sithOrder">Sith Order</option>
                    <option value="separatist">Separatist</option>
                </select>


                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost;