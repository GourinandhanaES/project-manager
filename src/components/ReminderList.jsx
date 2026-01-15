import { Trash2 } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const ReminderList = ({ reminders, onUpdate,today }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const addReminder = () => {
    if (!title.trim() || !date) return;

    const newReminder = {
      id: uuid(),
      title,
      date
    };

    onUpdate([...reminders, newReminder]);
    setTitle("");
    setDate("");
  };
  const deleteReminder = (id) => {
    const filteredReminders = reminders.filter((r) => r.id !== id);
    onUpdate(filteredReminders);
  };
    const isUpcoming = (rDate) => {
        const diff = (new Date(rDate) - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 3; 
    };

    const sortedReminders = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
        Reminders ({reminders.length})
      </h2>

      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input type="text" placeholder="Reminder title" className="border p-2 rounded w-full md:flex-1" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <input type="date" className="border p-2 rounded w-full md:w-auto" value={date} onChange={(e) => setDate(e.target.value)}/>

        <button onClick={addReminder} className="bg-purple-600 text-white px-4 py-2 rounded w-full md:w-auto">
          Add
        </button>
      </div>

      {/* Reminder List */}
      <ul className="space-y-5">
        {sortedReminders.map((r) => (
          <li
            key={r.id}
            className={`border-2 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between gap-2 ${
            isUpcoming(r.date) ? "border-yellow-500 bg-yellow-50 text-red-400" : "border-gray-300" }`}
          >
            <span className="font-medium dark:text-gray-500">{r.title}</span>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{r.date}</span>
                <Trash2 onClick={() => deleteReminder(r.id)} className="w-5 h-5 text-red-600 cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
