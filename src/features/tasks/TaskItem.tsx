import { useState } from 'react';
import { Task } from './TaskList';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface TaskItemProps {
    task: Task;
    onDelete: () => Promise<unknown> | void;
    onUpdate: (task: Task) => Promise<unknown> | void;
}

function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
    const [checked, setChecked] = useState(task.isComplete);

    let borderColor = 'border-neutral-600';
    switch (task.priority) {
        case 1:
            borderColor = 'border-blue-500';
            break;
        case 2:
            borderColor = 'border-yellow-500';
            break;
        case 3:
            borderColor = 'border-red-500';
            break;
        case 4:
            borderColor = 'border-violet-500';
    }

    async function handleDelete() {
        try {
            await onDelete();
            toast.success('Success');
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            toast.error(msg || 'Failed to delete');
        }
    }

    async function handleToggle(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.checked;
        setChecked(val);
        try {
            await onUpdate({ ...task, isComplete: val });
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            toast.error(msg || 'Failed to update');
        }
    }

    return (
        <div className={`flex w-full items-center gap-3 rounded-xl border-l py-1 pr-1 pl-3 ${borderColor}`}>
            <input
                type="checkbox"
                className={`checkbox checkbox-xs border ${borderColor}`}
                checked={checked}
                onChange={handleToggle}
            />
            <div className="max-w-[200px] text-wrap">
                <h2 className="text-sm font-semibold">{task.title}</h2>
                <p className="text-xs">Deadline: {task.dueDate ? new Date(task.dueDate).toDateString() : 'None'}</p>
            </div>
            <button className="btn btn-ghost btn-circle btn-sm hover:text-error ml-auto" onClick={() => handleDelete()}>
                <XMarkIcon className="h-4 w-4" />
            </button>
        </div>
    );
}

export default TaskItem;
