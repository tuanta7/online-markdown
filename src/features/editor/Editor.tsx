import { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';

import {
    ListBulletIcon,
    CloudArrowUpIcon,
    CodeBracketIcon,
    ArrowUpTrayIcon,
    ShieldExclamationIcon,
    ArrowsRightLeftIcon,
    StrikethroughIcon,
    Squares2X2Icon,
    PhotoIcon,
} from '@heroicons/react/24/outline';

import 'github-markdown-css/github-markdown.css';
import 'katex/dist/katex.min.css';

import * as prettier from 'prettier/standalone';
import * as parserMarkdown from 'prettier/parser-markdown';
import ExportButton from './ExportButton';
import Preview from './Preview';
import BoldButton from './BoldButton';
import MathButton from './MathButton';
import ItalicButton from './ItalicButton';

import { useThemeStore } from '../../store/themeStore';

function Editor() {
    const [preview, setPreview] = useState(false);
    const [contents, setContents] = useState(localStorage.getItem('file-name-contents') || '');
    const useLightTheme = useThemeStore((s) => s.useLightTheme);

    // For codemirror, we don't need a ref for the editor instance for basic usage
    const editorRef = useRef<EditorView | null>(null);

    const onContentsChange = (value: string) => {
        setContents(value);
        localStorage.setItem('file-name-contents', value);
    };

    useEffect(() => {
        const keydownHandler = async (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                const formatted = await prettier.format(contents, {
                    parser: 'markdown',
                    printWidth: 120,
                    tabWidth: 4,
                    plugins: [parserMarkdown],
                });
                setContents(formatted);
                localStorage.setItem('file-name-contents', formatted);
            }
        };
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    }, [contents]);

    const paddingTheme = EditorView.theme({
        '&.cm-editor .cm-scroller': {
            padding: '16px',
        },
    });

    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap-reverse justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="join rounded-2xl">
                        <BoldButton editorRef={editorRef} className="join-item" />
                        <ItalicButton editorRef={editorRef} className="join-item" />
                        <button className="btn join-item">
                            <StrikethroughIcon className="h-4 w-4" />
                        </button>
                    </div>

                    <button className="btn">
                        <ListBulletIcon className="h-4 w-4" />
                        <span className="hidden md:inline">List</span>
                    </button>
                    <button className="btn">
                        <PhotoIcon className="h-4 w-4" />
                        <span className="hidden md:inline">Image</span>
                    </button>
                    <button className="btn">
                        <Squares2X2Icon className="h-4 w-4" />
                        <span className="hidden md:inline">Table</span>
                    </button>
                    <button className="btn">
                        <CodeBracketIcon className="h-4 w-4" />
                        <span className="hidden md:inline">Code</span>
                    </button>
                    <MathButton editorRef={editorRef} />
                    <button className="btn">
                        <ShieldExclamationIcon className="h-4 w-4" />
                        <span className="hidden md:inline">Alerts</span>
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn text-primary w-28" onClick={() => setPreview(!preview)}>
                        <ArrowsRightLeftIcon className="h-4 w-4" />
                        {preview ? 'Edit' : 'Preview'}
                    </button>
                    <button className="btn">
                        <CloudArrowUpIcon className="h-4 w-4" />
                        <span className="hidden md:inline">Save</span>
                    </button>
                    <button className="btn">
                        <ArrowUpTrayIcon className="h-4 w-4" />
                        <span className="hidden md:inline">Upload</span>
                    </button>
                    <ExportButton contents={contents} />
                </div>
            </div>
            {preview ? (
                <Preview contents={contents} />
            ) : (
                <CodeMirror
                    onCreateEditor={(view) => {
                        editorRef.current = view;
                    }}
                    value={contents}
                    height="100%"
                    width="100%"
                    theme={useLightTheme ? 'light' : 'dark'}
                    extensions={[markdown(), paddingTheme]}
                    onChange={(value) => onContentsChange(value)}
                    style={{
                        fontSize: '16px',
                    }}
                    className="h-full overflow-hidden rounded-lg border border-neutral-600"
                />
            )}
        </div>
    );
}

export default Editor;
