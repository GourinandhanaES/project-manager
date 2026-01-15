import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjectsFromStorage } from "../utils/localStorage";
import { Folder, CheckCircle, Clock, PauseCircle, AlertCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({onFilterChange }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const storedProjects = getProjectsFromStorage() || [];
    setProjects(storedProjects);
  }, []);

  const completedCount = projects.filter(p => p.status === "Completed").length;
  const pendingCount = projects.filter(p => ["Pending","Active","In Progress"].includes(p.status)).length;
  const onHoldCount = projects.filter(p => p.status === "On Hold").length;
  const today = new Date();
  const nearDeadlineCount = projects.filter(p => {
    const end = new Date(p.endDate);
    const diff = (end - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  const menuItems = [
    { label: "All Projects", icon: Folder, count: projects.length, path: "/" },
    { label: "Completed Projects", icon: CheckCircle, count: completedCount, path: "/projects/completed" },
    { label: "Pending Projects", icon: Clock, count: pendingCount, path: "/projects/pending" },
    { label: "On Hold Projects", icon: PauseCircle, count: onHoldCount, path: "/projects/onhold" },
    { label: "Near Deadline", icon: AlertCircle, count: nearDeadlineCount, path: "/projects/near-deadline" },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 min-h-screen bg-purple-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-r p-4 sm:p-6 w-20 sm:w-64 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3 mb-5 cursor-pointer" onClick={() => navigate("/")}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOqoDDBopYuN6Ae0uCr6mMRPtaduuZspshw&s" alt="Company Logo" className="w-10 h-10 object-cover rounded-full mx-auto sm:mx-0" />
        <h1 className="hidden sm:block text-xl font-bold">CloudHouse</h1> 
      </div> <hr className="border-black mb-2"/>

      {/* Menu */}
      <nav className="flex flex-col gap-3 text-gray-700 dark:text-white">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onFilterChange(item.label)}
              className="flex justify-center sm:justify-between items-center px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-500 relative group"
            >
              <Icon className="w-6 h-6 mx-auto sm:mx-0 md:hidden lg:hidden" />
              <span className="hidden sm:inline-flex justify-between font-semibold w-full">
                <span>{item.label}</span>
                <span>{item.count}</span>
              </span>
              {/* Tooltip on small screens */}
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap hidden group-hover:block sm:hidden">
                {item.label} ({item.count})
              </span>
            </button>
          );
        })}
      </nav>
      <button  onClick={toggleTheme} className="mt-auto flex justify-center items-center gap-2 p-2 rounded-lg bg-purple-500 dark:bg-gray-700 text-white dark:text-white" >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}

        <span className="hidden sm:inline">
            {darkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
