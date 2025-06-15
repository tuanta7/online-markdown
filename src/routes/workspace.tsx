import { createFileRoute } from '@tanstack/react-router';
import PomodoroTimer from '../components/PomodoroTimer.tsx';

import 'github-markdown-css/github-markdown.css';
import 'katex/dist/katex.min.css';
import Editor from '../features/editor/Editor.tsx';

export const Route = createFileRoute('/workspace')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-fit py-3 px-6">
            <div className="flex gap-3 mb-6">
                <img
                    src="/public/lake.png"
                    className="object-cover object-center h-[250px] w-full border-1 border-neutral-600 rounded-lg"
                />
                <PomodoroTimer />
                <PomodoroTimer />
            </div>
            <Editor />
        </div>
    );
}
