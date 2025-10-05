import { createFileRoute } from '@tanstack/react-router';
import PomodoroTimer from '../components/PomodoroTimer.tsx';

import Editor from '../features/editor/Editor.tsx';
import TaskList from '../features/tasks/TaskList.tsx';
import Gif from '../features/gif/Gif.tsx';
import ProtectedLayout from '../features/layouts/ProtectedLayout.tsx';
import DocumentList from '../features/documents/DocumentList.tsx';

export const Route = createFileRoute('/workspace')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ProtectedLayout>
            <div className="flex gap-6 px-6 py-3 max-md:flex-col">
                <div className="max-h-[85vh] max-md:w-full md:max-w-88">
                    <div className="flex h-full flex-col gap-6">
                        <div className="overflow-hidden rounded-lg max-md:hidden">
                            <Gif />
                        </div>
                        <div className="rounded-lg border border-neutral-600">
                            <PomodoroTimer />
                        </div>
                        <div className="rounded-lg border border-neutral-600">
                            <TaskList />
                        </div>
                        <div className="overflow-y-auto rounded-lg border border-neutral-600 px-3 py-1 md:flex-1">
                            <DocumentList />
                        </div>
                    </div>
                </div>
                <Editor />
            </div>
        </ProtectedLayout>
    );
}
