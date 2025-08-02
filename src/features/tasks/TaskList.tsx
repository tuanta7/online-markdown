import { PlusCircleIcon } from '@heroicons/react/24/outline';
import TaskItem from './TaskItem';
import { useState } from 'react';
import TaskCreate from './TaskCreate';
import { useQuery } from '@tanstack/react-query';

import { apiClient } from '../../services/apiClient';

export interface Task {
    id: string;
    name: string;
    done: boolean;
    deadline: string;
}

interface TaskListResponse {
    page: number;
    total: number;
    status: string;
    tasks: Task[];
}

function TaskList() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { data, isPending } = useQuery<TaskListResponse>({
        queryKey: ['tasks'],
        queryFn: () => {
            return apiClient.sendRequest('GET', '/tasks', {
                withCredentials: true,
            });
        },
        retry: false,
    });

    return (
        <div className="w-full py-2 pl-2">
            <div className="mb-2 flex items-center gap-3 px-2">
                <h2 className="text-lg font-bold">To-do List</h2>
                <button
                    className="btn btn-sm btn-ghost btn-circle"
                    onClick={() => {
                        setShowCreateForm(!showCreateForm);
                    }}
                >
                    <PlusCircleIcon className="text-primary h-6 w-6" />
                </button>
            </div>
            <div className="m-2 grid max-h-[130px] gap-3 overflow-auto pr-2">
                {showCreateForm && <TaskCreate />}
                {data?.tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;
