import React from 'react'
import "../style/Home.css"
import ProjectPage from "../component/ProjectDetails"
const Home = () => {
  return (
    <div>
      <div className='home'>
        <div className='home-intro'>
            RBAC (Role-Based Access Control) in a UI typically involves designing and 
            implementing user interfaces that cater to different user roles and their 
            respective permissions. This is a common requirement in many applications
            and systems, especially those that deal with sensitive data or complex
            business logic. In this project, we will be implementing a simple RBAC
            system in a React UI using React Router and Context API. We will create
            different user roles, define their permissions, and restrict access to
            certain pages based on the user's role. We will also implement a login
            and registration system to manage user authentication and authorization.
        </div>
        <div className='home-title'>
            <h1>RBAC-<span>UI</span></h1>
        </div>
        </div>
        <div>
            <ProjectPage/>
        </div>
        
    </div>
  )
}

export default Home
