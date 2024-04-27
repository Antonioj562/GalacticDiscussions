import { supabase } from "../client";
import { useState } from "react";
import '../styles/createpost.css'

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        textBody: "",
        alliance: "",
        createdBy: "",
    });
    const [randomString, setRandomString] = useState("");

    const createPost = async (event) => {
        event.preventDefault();
        console.log("Submitting post:", post);
        try{
            const secret = generateRandomString();
            await supabase
                .from('Posts')
                .insert({
                    title: post.title, 
                    textBody: post.textBody, 
                    alliance: post.alliance,
                    postSecret: secret,
                    comments: [{ "Name": "Comment" }]
                    });
                setRandomString(secret);
        } catch (error){
            console.error('Error creating post:', error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 6; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
    };

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
                    value={post.title}
                    onChange={handleChange}
                    style={{ resize: "none", borderRadius: "10px", padding: "5px" }}
                    /><br />

                <label>Body</label><br />
                <textarea
                    type="textBox"
                    rows="10"
                    cols="50"
                    name="textBody"
                    className="textBody"
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

                {randomString && <p>Secret to edit or delete this post later: {randomString}</p>}

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost;