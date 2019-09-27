import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'


const ProjectsList = ({projects}) => {
    return ( 
        <div className="project-list section ">  
            { projects && projects.map(project => { 
                    return (
                        // key must related to parent element not the child
                        <Link to={'/project/' + project.id} key={project.id} >
                            <ProjectSummary project={project} />
                        </Link> 
                    )
                }) 
             } 
        </div>
    )
}
export default ProjectsList