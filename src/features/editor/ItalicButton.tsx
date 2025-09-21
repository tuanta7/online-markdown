import { EditorView } from '@codemirror/view';
import { ItalicIcon } from '@heroicons/react/24/outline';

interface ItalicButtonProps {
    editorRef: React.MutableRefObject<EditorView | null>;
    className?: string;
}

function ItalicButton({ editorRef, className }: ItalicButtonProps) {
    const insertItalicText = () => {
        const view = editorRef.current;
        if (!view) return;
        const { state } = view;
        const selection = state.selection.main;
        const selectedText = state.sliceDoc(selection.from, selection.to);
        let tr;
        if (selectedText) {
            tr = state.update({
                changes: {
                    from: selection.from,
                    to: selection.to,
                    insert: `*${selectedText}*`,
                },
                selection: { anchor: selection.from + 1, head: selection.to + 1 },
            });
        } else {
            tr = state.update({
                changes: { from: selection.from, to: selection.to, insert: '**' },
                selection: { anchor: selection.from + 1 },
            });
        }
        view.dispatch(tr);
        view.focus();
    };

    return (
        <button className={className ? `btn ${className}` : 'btn'} type="button" onClick={insertItalicText}>
            <ItalicIcon className="h-4 w-4" />
        </button>
    );
}

export default ItalicButton;
