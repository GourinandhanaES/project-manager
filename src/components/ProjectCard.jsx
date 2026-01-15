import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const statusStyles = {
  InProgress: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  OnHold: "bg-orange-100 text-orange-700",
  Completed: "bg-green-100 text-green-700",
};

const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-orange-100 text-orange-700",
  Low: "bg-green-100 text-green-700"
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const completedTasks = project.tasks.filter( (task) => task.status === "Done").length;
  const progress = project.tasks.length? Math.round((completedTasks / project.tasks.length) * 100): 0;

  return (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      className="cursor-pointer border dark:border-none rounded-xl p-5 bg-white dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {project.name}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium  ${priorityStyles[project.priority]}`}>
          {project.priority}
        </span>
      </div>

      <ProgressBar progress={progress} />
 
      <div className="text-sm mt-4 space-y-2 text-gray-600 dark:text-gray-100">
        <div className="flex justify-between">
          <span>Total Tasks</span>
          <span className="font-medium">{project.tasks.length}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Status</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Due Date</span>
          <span className="font-medium">{project.endDate}</span>
        </div>
      </div>
      <div>
        <p className=" font-bold mt-3 mb-1">Project Manager: <span>{project.projectManager}</span></p>
      </div>

      {/* Assignees */}
      {project.assignees?.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="font-semibold whitespace-nowrap ">
            Assignees:
          </p>
          <div className="flex items-center -space-x-2">
            {project.assignees.slice(0, 3).map((name, index) => (
              <div
                key={index}
                title={name}
                className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-white"
              >
                {name.charAt(0).toUpperCase()}
              </div>
            ))}

            {project.assignees.length > 3 && (
              <div className="w-9 h-9 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-sm font-semibold border-2 border-white">
                +{project.assignees.length - 3}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
