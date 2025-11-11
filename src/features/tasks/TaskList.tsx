import { DocumentIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import TaskItem from './TaskItem';
import { useState } from 'react';
import TaskCreate from './TaskCreate';
import { useTasks } from '../../hooks/useTasks';

export interface Task {
    id: string;
    title: string;
    isComplete: boolean;
    priority: number;
    dueDate?: string;
}

function TaskList() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [page, setPage] = useState(1);

    const pageSize = 3;
    const { tasks, total, createTask, deleteTask, updateTask } = useTasks(page, pageSize);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <div className="w-full py-2 pl-2">
            <div className="mb-4 flex items-center gap-3 px-2">
                <h2 className="flex-1 text-lg font-bold">To-do List</h2>
                <div className="ml-auto flex items-center gap-2">
                    <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        title="Previous page"
                    >
                        &lt;
                    </button>
                    <span className="text-xs font-semibold">
                        {page} / {totalPages || 1}
                    </span>
                    <button
                        className="btn btn-xs btn-ghost"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        title="Next page"
                    >
                        &gt;
                    </button>
                    <button
                        className="btn btn-sm btn-ghost btn-circle ml-2"
                        onClick={() => {
                            setShowCreateForm(!showCreateForm);
                        }}
                    >
                        {showCreateForm ? (
                            <XCircleIcon className="h-6 w-6 text-orange-500" />
                        ) : (
                            <PlusCircleIcon className="text-primary h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>
            <div className="m-2 grid max-h-[140px] gap-3 overflow-auto pr-2">
                {showCreateForm && <TaskCreate setOpen={setShowCreateForm} onCreate={createTask} />}
                {tasks && tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-sm">
                        <DocumentIcon className="h-6 w-6" />
                        <div>You're all caught up!</div>
                    </div>
                )}
                {tasks &&
                    tasks.length > 0 &&
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={() => deleteTask(task.id)}
                            onUpdate={(t) => updateTask(t)}
                        />
                    ))}
            </div>
        </div>
    );
}

export default TaskList;
