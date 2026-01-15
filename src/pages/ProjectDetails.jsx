import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectsFromStorage, saveProjectsToStorage } from "../utils/localStorage";
import TaskList from "../components/TaskList";
import ReminderList from "../components/ReminderList";
import ProjectModal from "../components/ProjectModal";
import { ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const projects = getProjectsFromStorage();
    const selectedProject = projects.find((p) => p.id === id);
    setProject(selectedProject);
  }, [id]);

  const updateTasks = (updatedTasks) => {
    const projects = getProjectsFromStorage();
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, tasks: updatedTasks } : p
    );

    saveProjectsToStorage(updatedProjects);
    setProject({ ...project, tasks: updatedTasks });
  };

  const updateReminders = (reminders) => {
    const sortedReminders = reminders.sort((a, b) => new Date(a.date) - new Date(b.date));
    const projects = getProjectsFromStorage();
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, reminders: sortedReminders } : p
    );
    saveProjectsToStorage(updatedProjects);
    setProject({ ...project, reminders: sortedReminders });
  };

  if (!project) {
    return <p className="p-6">Project not found</p>;
  }
  const today = new Date();

  return (
    <div className="p-8 bg-purple-200 dark:bg-gray-900 min-h-screen">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-purple-700 font-medium mb-4 hover:underline">
           <ArrowLeft className="w-5 h-5" /> Back
        </button>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl text-black dark:text-white font-bold mb-2">{project.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
          </div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setOpenModal(true)}
          >
            Edit Project
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm dark:text-gray-300">
          <p>Status: <strong>{project.status}</strong></p>
          <p>Priority: <strong>{project.priority}</strong></p>
          <p>Start: <strong>{project.startDate}</strong></p>
          <p>End: <strong>{project.endDate}</strong></p>
        </div>
         <div>
          <p className="font-small mt-3 mb-1 dark:text-gray-300">Assignees:</p>
          <div className="flex flex-wrap gap-2">
            {project.assignees.map((user) => (
              <span key={user} className="px-3 py-1 bg-gray-200 rounded-full text-sm" >
                {user}
              </span>
            ))}
          </div>
          <p className="font-small font-bold mt-3 mb-1 dark:text-gray-300">Project Manager: <span>{project.projectManager}</span></p>
        </div>
      </div>


      <div className="grid md:grid-cols-2 gap-6">
        <TaskList tasks={project.tasks || []} onUpdate={updateTasks}/>
        <ReminderList reminders={project.reminders || []} onUpdate={updateReminders} today={today} />
      </div>

      {openModal && (
        <ProjectModal editProject={project} onClose={() => setOpenModal(false)}
          onSave={(updatedProject) => {
            const projects = getProjectsFromStorage();
            const updatedProjects = projects.map((p) =>
              p.id === id ? { ...updatedProject } : p
            );
            saveProjectsToStorage(updatedProjects);
            setProject(updatedProject);
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
