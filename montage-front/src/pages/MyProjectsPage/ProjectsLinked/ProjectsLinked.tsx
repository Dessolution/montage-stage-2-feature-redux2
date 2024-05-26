import React from 'react';
import './ProjectLinked.css'
import ProjectFilterPanel from '../../../components/ProjectFilterPanel/ProjectFilterPanel';
import ProjectCell from '../../../components/ProjectCell/ProjectCell';



const ProjectsLinked: React.FC = () => {
    return (
        <div className='Projects__linked'>
            <ProjectFilterPanel />
            <div className='Linked__projects'>
                <ProjectCell />


            </div>
        </div>







    )
}

export default ProjectsLinked;