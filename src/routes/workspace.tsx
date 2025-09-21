import { createFileRoute } from '@tanstack/react-router';
import PomodoroTimer from '../components/PomodoroTimer.tsx';

import Editor from '../features/editor/Editor.tsx';
import TaskList from '../features/tasks/TaskList.tsx';
import Gif from '../features/gif/Gif.tsx';
import ProtectedLayout from '../features/layouts/ProtectedLayout.tsx';

export const Route = createFileRoute('/workspace')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ProtectedLayout>
            <div className="flex h-fit w-full flex-col gap-6 px-6 py-3">
                <div className="flex gap-6 max-md:flex-col">
                    <div className="max-md:w-full md:max-w-88">
                        <div className="flex h-full w-full flex-col gap-6">
                            <div className="overflow-hidden rounded-lg max-md:hidden">
                                <Gif />
                            </div>
                            <div className="rounded-lg border border-neutral-600">
                                <PomodoroTimer />
                            </div>
                            <div className="rounded-lg border border-neutral-600">
                                <TaskList />
                            </div>
                            <div className="flex-1 rounded-lg border border-neutral-600">Documents</div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Editor />
                    </div>
                </div>
            </div>
        </ProtectedLayout>
    );
}
