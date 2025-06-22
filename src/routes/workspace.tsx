import { createFileRoute } from '@tanstack/react-router';
import PomodoroTimer from '../components/PomodoroTimer.tsx';

import 'github-markdown-css/github-markdown.css';
import 'katex/dist/katex.min.css';
import Editor from '../features/editor/Editor.tsx';
import TaskList from '../features/tasks/TaskList.tsx';

export const Route = createFileRoute('/workspace')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="h-fit w-full px-6 py-3">
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="max-h-[200px] flex-1 overflow-hidden rounded-lg border">
                    <img src="/lake.png" className="h-[200px] w-full object-cover object-center" />
                </div>
                <PomodoroTimer />
                <TaskList />
            </div>
            <Editor />
        </div>
    );
}
