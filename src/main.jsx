import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import CreatePost from './pages/CreatePost.jsx'
import HomeFeed from './pages/HomeFeed.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout/>}> 
          <Route index={true} element={<App/>}/>

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
                <Link className='errorPage' to="/">
                  Back to Home
                </Link>
              </main>
              }
            />
          
          <Route index={false} path="/HomeFeed/" element={<HomeFeed />}/>
          <Route index={false} path="/CreatePost/" element={<CreatePost />}/>


        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
