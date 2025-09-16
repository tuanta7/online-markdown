import { useState, useRef, useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { VariableIcon } from '@heroicons/react/24/outline';

const MATH_SNIPPETS = [
    {
        label: 'Integral',
        markdown: '\\int_{a}^{b} f(x) \\, dx',
        preview: '$$ \\int_{a}^{b} f(x) \\, dx $$',
    },
    {
        label: 'Sigma (Sum)',
        markdown: '\\sum_{n=1}^{\\infty} a_n',
        preview: '$$ \\sum_{n=1}^{\\infty} a_n $$',
    },
    {
        label: 'Derivative',
        markdown: '\\frac{d}{dx} f(x)',
        preview: '$$ \\frac{d}{dx} f(x) $$',
    },
];

interface MathButtonProps {
    editorRef: React.MutableRefObject<EditorView | null>;
}

function MathButton({ editorRef }: MathButtonProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (open && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const insertSnippet = (snippet: string) => {
        const view = editorRef.current;
        if (!view) return;
        const { state } = view;
        const selection = state.selection.main;
        const tr = state.update({
            changes: {
                from: selection.from,
                to: selection.to,
                insert: `$${snippet}$`,
            },
            selection: { anchor: selection.from + 1, head: selection.from + 1 + snippet.length },
        });
        view.dispatch(tr);
        view.focus();
        setOpen(false);
    };

    return (
        <div className="dropdown dropdown-top" ref={dropdownRef}>
            <button
                className="btn btn-sm"
                type="button"
                tabIndex={0}
                onClick={() => setOpen((v) => !v)}
                aria-label="Insert math equation"
            >
                <VariableIcon className="h-4 w-4" />
                <span className="hidden md:inline">Math</span>
            </button>
            {open && (
                <ul className="dropdown-content menu bg-base-100 rounded-box z-50 mt-2 w-64 shadow-lg">
                    {MATH_SNIPPETS.map((item) => (
                        <li key={item.label}>
                            <button
                                className="hover:bg-base-200 flex w-full flex-col items-start rounded px-2 py-1"
                                onClick={() => insertSnippet(item.markdown)}
                            >
                                <span className="mb-1 text-sm font-semibold">{item.label}</span>
                                <span className="mb-1 font-mono text-xs text-neutral-500">{item.markdown}</span>
                                <span className="katex-preview" dangerouslySetInnerHTML={{ __html: item.preview }} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MathButton;
