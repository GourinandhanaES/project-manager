
export const PROJECT_STATUS = [
  "Planning",
  "On Hold",
  "In Progress",
  "Completed"
];

export const PROJECT_PRIORITY = [
  "Low",
  "Medium",
  "High"
];

export const USERS = [
  "Gouri",
  "Punnya",
  "Deva",
  "Shiva",
  "Lakshmi",
  "Vishnu",
];

export const projectData = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Redesign company website with modern UI",
    startDate: "2025-01-01",
    endDate: "2025-02-15",
    status: "In Progress",
    priority: "High",
    projectManager: "Punnya",
    assignees: ["Gouri", "Shiva", "Lakshmi", "Vishnu"],
    tasks: [
      {
        id: "t1",
        name: "Create wireframes",
        description: "Design homepage wireframes",
        assignedTo: "Deva",
        status: "Done"
      },
      {
        id: "t2",
        name: "Develop UI",
        description: "Implement UI using React",
        assignedTo: "Gouri",
        status: "In Progress"
      }
    ],
    reminders: [
      {
        id: "r1",
        date: "2025-01-20",
        title: "Client review meeting"
      },
      {
        id: "r2",
        date: "2025-02-10",
        title: "Final delivery reminder"
      }
    ]
  }
];
