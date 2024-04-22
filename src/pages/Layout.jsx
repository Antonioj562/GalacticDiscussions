import { Outlet, Link } from "react-router-dom"
import '../styles/navbar.css'
import CreatePost from "./CreatePost";
const layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <ul className="navLink" key="home-button">
                        <Link  to="/">
                            Home
                        </Link>
                    </ul>
                    <br></br>
                    <ul className="navLink" key="CreatePostButton">
                        <Link to="/CreatePost/" element={<CreatePost />}>
                            Create Post
                        </Link>
                    </ul>
                    <br></br>
                    <ul className="navLink" key="allBotsButton">
                        test1
                    </ul>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
};

export default layout;