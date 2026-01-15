import React, { useEffect, useState } from "react";
import {v4 as uuid} from "uuid";
import { PROJECT_STATUS,PROJECT_PRIORITY,USERS } from "../data/projectData";

const ProjectModal =({ onClose, onSave, editProject})=>{
    const [form,setForm]=useState({name:"",description:"",startDate: "", endDate: "",status: "Planned",  priority: "Medium",projectManager: "", assignees: [], reminders: []});

    const[error,setError]=useState("")

    useEffect(() => {
        if (editProject) {
        setForm(editProject);
        }
    }, [editProject]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const toggleAssignee = (user) => {
    setForm((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(user)
        ? prev.assignees.filter((u) => u !== user)
        : [...prev.assignees, user]
    }));
  };

  const addReminder = () => {
    setForm({
      ...form,
      reminders: [
        ...form.reminders,
        { id: uuid(), date: "", description: "" }
      ]
    });
  };

  const updateReminder = (id, field, value) => {
    setForm({
      ...form,
      reminders: form.reminders.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    });
  };

  const removeReminder = (id) => {
    setForm({
      ...form,
      reminders: form.reminders.filter((r) => r.id !== id)
    });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      return setError("Project name is required");
    }
    if (form.endDate < form.startDate) {
      return setError("End date must be after start date");
    }
    if (form.assignees.length === 0) {
      return setError("Select at least one assignee");
    }

    setError("");

    onSave({
      ...form,
      id: editProject?.id || uuid(),
      tasks: editProject?.tasks || []
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-300">
          {editProject ? "Edit Project" : "Create Project"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input name="name" placeholder="Project Name " className="w-full border p-2 rounded mb-3" value={form.name} onChange={handleChange} />

        <textarea name="description" placeholder="Project Description" className="w-full border p-2 rounded mb-3" value={form.description} onChange={handleChange}/>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
                <label className="block mb-1 dark:text-gray-300">Start Date</label>
                <input type="date" name="startDate" className="border p-2 rounded w-full dark:text-gray-900" value={form.startDate} onChange={handleChange} />
            </div>
            <div>
                <label className="block mb-1 dark:text-gray-300">End Date</label>
                <input type="date" name="endDate" className="border p-2 rounded w-full dark:text-gray-900" value={form.endDate} onChange={handleChange} />
            </div>
        </div>

       {/* status ,priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
                <label className="block mb-1 dark:text-gray-300">Status</label>
                <select name="status" className="border p-2 rounded w-full dark:text-gray-900" value={form.status} onChange={handleChange}>
                    {PROJECT_STATUS.map((s) => (
                        <option key={s}>
                            {s}
                        </option>))}
                </select>
            </div>
            <div>
                <label className="block mb-1 dark:text-gray-300">Priority</label>
                <select name="priority" className="border p-2 rounded w-full dark:text-gray-900" value={form.priority} onChange={handleChange}>
                    {PROJECT_PRIORITY.map((p) => (
                        <option key={p}>
                            {p}
                        </option>))}
                    </select>
            </div>
        </div>


        {/* Project Manager */}
        <select name="projectManager" className="border p-2 rounded w-full mb-4 dark:text-gray-900" value={form.projectManager} onChange={handleChange} >
          <option value="">Select Project Manager</option>
          {USERS.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        {/* Assignees */}
        <div className="mb-4">
          <p className="font-medium mb-2 dark:text-gray-300">Assignees *</p>
          <div className="flex flex-wrap gap-2">
            {USERS.map((user) => (
              <button type="button" key={user} onClick={() => toggleAssignee(user)} className={`px-3 py-1 rounded-full border text-sm transition dark:text-gray-900 ${ form.assignees.includes(user) ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-100" }`} >
                {user}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium dark:text-gray-300">Reminders</p>
            <button onClick={addReminder} className="text-purple-600 text-sm">
              + Add Reminder
            </button>
          </div>

          {form.reminders.map((r) => (
            <div key={r.id} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input  type="date" className="border p-2 rounded sm:w-1/3 dark:text-gray-900" value={r.date} onChange={(e) => updateReminder(r.id, "date", e.target.value)}/>
              <input placeholder="Reminder title" className="border p-2 rounded flex-1 " value={r.title} onChange={(e) =>  updateReminder(r.id, "title", e.target.value)}/>
              <button onClick={() => removeReminder(r.id)} className="text-red-500 text-sm" >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded dark:text-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded" >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;