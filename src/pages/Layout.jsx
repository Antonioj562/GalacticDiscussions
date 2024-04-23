import { Outlet, Link } from "react-router-dom"
import '../styles/navbar.css'
import CreatePost from "./CreatePost";
import HomeFeed from "./HomeFeed";

const layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <ul className="navLink" key="home-button">
                        <Link  to="/HomeFeed/" element={<HomeFeed/>}>
                            Home Feed
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