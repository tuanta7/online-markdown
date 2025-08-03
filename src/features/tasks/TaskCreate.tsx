import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';

import { formatDateToISO } from '../../utils/date';
import { toast } from 'sonner';

interface TaskCreateRequest {
    title: string;
    priority: number;
    startDate: string;
    dueDate: string;
}

type TaskCreateProps = {
    setOpen: (open: boolean) => void;
};

function TaskCreate({ setOpen }: TaskCreateProps) {
    const queryClient = useQueryClient();
    const { mutate: createTask } = useMutation({
        mutationFn: async (task: TaskCreateRequest) => {
            const payload: TaskCreateRequest = {
                ...task,
                startDate: formatDateToISO(task.startDate),
                dueDate: formatDateToISO(task.dueDate),
            };

            return apiClient.sendRequest('POST', '/tasks', {
                data: payload,
                withCredentials: true,
            });
        },
        onSuccess: () => {
            form.reset();
            setOpen(false);
            toast.success('Success!!');
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const form = useForm({
        defaultValues: {
            title: '',
            priority: 1,
            startDate: '',
            dueDate: '',
        },
        onSubmit: async ({ value }) => {
            createTask(value);
        },
    });

    return (
        <form
            className="mb-3 flex flex-col gap-1"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="grid grid-cols-5 items-center gap-3">
                <form.Field name="priority">
                    {(field) => (
                        <div className="form-control col-span-2">
                            <label className="label label-text px-1 text-xs">Priority</label>
                            <select
                                className="select select-sm"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                            >
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                                <option value={4}>Very High</option>
                            </select>
                        </div>
                    )}
                </form.Field>
                <form.Field name="title">
                    {(field) => (
                        <div className="form-control col-span-3">
                            <label className="label label-text px-1 text-xs">Title</label>
                            <input
                                className="input input-bordered input-sm"
                                type="text"
                                placeholder="Title"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                required
                            />
                        </div>
                    )}
                </form.Field>
            </div>
            <div className="grid grid-cols-5 items-baseline-last gap-3">
                <form.Field name="startDate">
                    {(field) => (
                        <div className="form-control col-span-2">
                            <label className="label label-text px-1 text-xs">Start</label>
                            <input
                                className="input input-bordered input-sm"
                                type="date"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                    )}
                </form.Field>
                <form.Field name="dueDate">
                    {(field) => (
                        <div className="form-control col-span-2">
                            <label className="label label-text px-1 text-xs">Due</label>
                            <input
                                className="input input-bordered input-sm"
                                type="date"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                    )}
                </form.Field>
                <button className="btn btn-primary btn-sm col-span-1" type="submit" disabled={form.state.isSubmitting}>
                    {form.state.isSubmitting ? '...' : 'Add'}
                </button>
            </div>
        </form>
    );
}

export default TaskCreate;
