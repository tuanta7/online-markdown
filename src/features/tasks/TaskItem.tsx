import { useState } from 'react';
import { Task } from './TaskList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TaskItemProps {
    task: Task;
}

function TaskItem({ task }: TaskItemProps) {
    const queryClient = useQueryClient();
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

    const deleteMutation = useMutation({
        mutationFn: async () => {
            return apiClient.sendRequest('DELETE', `/tasks/${task.id}`, {
                withCredentials: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return (
        <div className={`flex w-full items-center gap-3 rounded-xl border-l py-1 pr-1 pl-3 ${borderColor}`}>
            <input
                type="checkbox"
                className={`checkbox checkbox-xs border ${borderColor}`}
                checked={checked}
                onChange={(e) => {
                    setChecked(e.target.checked);
                    task.isComplete = e.target.checked;
                }}
            />
            <div className="max-w-[200px] text-wrap">
                <h2 className="text-sm font-semibold">{task.title}</h2>
                <p className="text-xs">Deadline: {task.dueDate ? new Date(task.dueDate).toDateString() : 'None'}</p>
            </div>
            <button
                className="btn btn-ghost btn-circle btn-sm hover:text-error ml-auto"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.status === 'pending'}
            >
                {deleteMutation.status === 'pending' ? '...' : <XMarkIcon className="h-4 w-4" />}
            </button>
        </div>
    );
}

export default TaskItem;
