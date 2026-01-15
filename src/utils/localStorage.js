const STORAGE_KEY = "projects";

export const getProjectsFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveProjectsToStorage = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};
