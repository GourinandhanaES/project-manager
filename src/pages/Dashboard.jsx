import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { getProjectsFromStorage, saveProjectsToStorage } from "../utils/localStorage";
import { projectData } from "../data/projectData";
import ProjectModal from "../components/ProjectModal";
import Sidebar from "../components/Sidebar";

const Dashboard=()=>{
    const [projects,setProjects]= useState([]);
    const [openModal,setOpenModal]=useState(false)
    const [filter, setFilter] = useState("All");

    useEffect(()=>{
        const storedProjects = getProjectsFromStorage();
        if(storedProjects){
            setProjects(storedProjects);
        }else{
            setProjects(projectData);
            saveProjectsToStorage(projectData);
        }
    },[]);

    const addProjects =(project)=>{
        const updatedProjects = [...projects,project]
        setProjects(updatedProjects)
        saveProjectsToStorage(updatedProjects)
    };

    const filteredProjects = projects.filter((p) => {
        if (filter === "All Projects") return true;
        if (filter === "Completed Projects") return p.status === "Completed";
        if (filter === "Pending Projects") return ["Pending", "Active", "In Progress"].includes(p.status);
        if (filter === "On Hold Projects")  return p.status === "On Hold";
        if (filter === "Near Deadline") {
            const today = new Date();
            const end = new Date(p.endDate);
            const diff = (end - today) / (1000 * 60 * 60 * 24);
            return diff >= 0 && diff <= 7;
        }
        return true;
    });


    return(
        <div className=" min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar onFilterChange={setFilter} />

        <div className=" ml-20 sm:ml-64 p-8 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
            <button onClick={() => setOpenModal(true)} className="bg-purple-600 dark:bg-purple-500 text-white dark:text-gray-100 px-4 py-2 rounded hover:opacity-90 transition">
                Create Project
            </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
            </div>

            {openModal && (
            <ProjectModal onClose={() => setOpenModal(false)}  onSave={addProjects} />
            )}
        </div>
      </div>
    );
};

export default Dashboard;
