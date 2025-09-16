import { EditorView } from '@codemirror/view';
import { BoldIcon } from '@heroicons/react/24/outline';

interface BoldButtonProps {
    editorRef: React.MutableRefObject<EditorView | null>;
}

function BoldButton({ editorRef }: BoldButtonProps) {
    const insertBoldText = () => {
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
                    insert: `**${selectedText}**`,
                },
                selection: { anchor: selection.from + 2, head: selection.to + 2 },
            });
        } else {
            tr = state.update({
                changes: { from: selection.from, to: selection.to, insert: '****' },
                selection: { anchor: selection.from + 2 },
            });
        }
        view.dispatch(tr);
        view.focus();
    };

    return (
        <button className="btn btn-sm w-10" type="button" onClick={insertBoldText}>
            <BoldIcon className="h-4 w-4" />
        </button>
    );
}

export default BoldButton;
