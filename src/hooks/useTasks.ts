import { useEffect, useState } from 'react';

export interface LocalTask {
    id: string;
    title: string;
    isComplete: boolean;
    priority: number;
    startDate?: string;
    dueDate?: string;
}

const STORAGE_KEY = 'om_tasks_v1';

function loadTasks(): LocalTask[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        return [];
    } catch (e) {
        console.error('Failed to load tasks from localStorage', e);
        return [];
    }
}

function saveTasks(tasks: LocalTask[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to save tasks to localStorage', e);
    }
}

export function useTasks(page = 1, pageSize = 3) {
    const [allTasks, setAllTasks] = useState<LocalTask[]>(() => loadTasks());

    useEffect(() => {
        // ensure we have the latest from localStorage on mount
        setAllTasks(loadTasks());
    }, []);

    const total = allTasks.length;

    const paged = allTasks.slice((page - 1) * pageSize, page * pageSize);

    async function createTask(input: { title: string; priority: number; startDate?: string; dueDate?: string }) {
        const newTask: LocalTask = {
            id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
            title: input.title,
            priority: input.priority || 1,
            startDate: input.startDate,
            dueDate: input.dueDate,
            isComplete: false,
        };

        const next = [newTask, ...allTasks];
        setAllTasks(next);
        saveTasks(next);
        return newTask;
    }

    async function deleteTask(id: string) {
        const next = allTasks.filter((t) => t.id !== id);
        setAllTasks(next);
        saveTasks(next);
        return id;
    }

    async function updateTask(task: LocalTask) {
        const next = allTasks.map((t) => (t.id === task.id ? task : t));
        setAllTasks(next);
        saveTasks(next);
        return task;
    }

    function reload() {
        setAllTasks(loadTasks());
    }

    return {
        tasks: paged,
        total,
        createTask,
        deleteTask,
        updateTask,
        reload,
    } as const;
}
