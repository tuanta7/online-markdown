import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

function TaskCreate() {
    const [submitted, setSubmitted] = useState(false);
    const form = useForm({
        defaultValues: {
            title: '',
            priority_level: 1,
            start_date: new Date().toDateString(),
            due_date: '',
        },
        onSubmit: async ({
            value,
        }: {
            value: {
                title: string;
                priority_level: number;
                start_date: string;
                due_date: string;
            };
        }) => {
            setSubmitted(true);
            // TODO: handle submit (e.g., call API)
            alert(JSON.stringify(value, null, 2));
        },
    });

    return (
        <form className="mb-3 flex flex-col gap-1" onSubmit={form.handleSubmit}>
            <div className="grid grid-cols-5 items-center gap-3">
                <form.Field name="priority_level">
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
                <form.Field name="start_date">
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
                <form.Field name="due_date">
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
