import { useForm } from '@tanstack/react-form';
import { formatDateToISO } from '../../utils/date';
import { toast } from 'sonner';

interface TaskCreateRequest {
    title: string;
    priority: number;
    startDate?: string;
    dueDate?: string;
}

type TaskCreateProps = {
    setOpen: (open: boolean) => void;
    onCreate: (task: TaskCreateRequest) => Promise<unknown>;
};

function TaskCreate({ setOpen, onCreate }: TaskCreateProps) {
    const form = useForm({
        defaultValues: {
            title: '',
            priority: 1,
            startDate: '',
            dueDate: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const payload: TaskCreateRequest = {
                    ...value,
                    startDate: value.startDate ? formatDateToISO(value.startDate) : undefined,
                    dueDate: value.dueDate ? formatDateToISO(value.dueDate) : undefined,
                };
                await onCreate(payload);
                form.reset();
                setOpen(false);
                toast.success('Success!!');
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                toast.error(msg || 'Failed to create task');
            }
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
