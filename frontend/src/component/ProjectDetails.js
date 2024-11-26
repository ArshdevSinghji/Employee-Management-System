import React, { useEffect, useState } from 'react';
import projectData from '../assets/data/projectDetails.json';
import '../style/ProjectDetails.css';

const ProjectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(projectData);
  }, []);

  return (
    <div className="project-page">
      {data && (
        <>
          <div className="grid-container">
            {data.functionalities.map((func, index) => (
              <div className="grid-item" key={index}>
                <h4>{func.title}</h4>
                <p>{func.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectPage;
