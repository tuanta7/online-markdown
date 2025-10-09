import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useQuery } from '@tanstack/react-query';

import { sleep } from '../../utils/mock';
import { Fragment } from 'react';

import { useThemeStore } from '../../store/themeStore';

interface PreviewProps {
    contents: string;
}

function MarkdownImage({ src = '', alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    // TODO: Get images data mapping from the current opening documents
    const images: Record<string, string> = {
        'minio.png': 'uuid-123e4567-e89b-12d3-a456-426614174000',
    };

    const imageId = images[src];

    const { data: url, isFetching } = useQuery({
        queryKey: ['url', imageId],
        queryFn: async () => {
            // const res = await fetch(`/api/images/${imageId}/presign`);
            // const json = await res.json();
            // return json.url as string;
            await sleep(3000); // Mock API call
            return 'https://cdn-images-1.medium.com/max/2400/0*QudNr5xo7HArqDlR';
        },
        enabled: Boolean(imageId),
    });

    let contents = (
        <Fragment>
            <span className="loading loading-infinity loading-md text-primary"></span>
            <span>{src} is loading</span>
        </Fragment>
    );

    if (!isFetching) {
        contents = (
            <img
                {...props}
                src={url}
                alt={alt}
                className="h-auto max-w-full rounded-lg object-contain"
                style={{ maxHeight: '300px' }}
            />
        );
    }

    return <span className="flex flex-col items-center justify-center">{contents}</span>;
}

function Preview({ contents }: PreviewProps) {
    const useLightTheme = useThemeStore((s) => s.useLightTheme);

    return (
        <div
            className="markdown-body h-full overflow-auto rounded-lg border border-neutral-500 p-10"
            data-theme={useLightTheme ? 'light' : 'dark'}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeHighlight, rehypeKatex]}
                components={{
                    img: ({ ...props }) => {
                        if (props.src?.startsWith('http://') || props.src?.startsWith('https://')) {
                            return (
                                <span className="flex justify-center">
                                    <img
                                        {...props}
                                        className="h-auto max-w-full rounded-lg object-contain"
                                        style={{ maxHeight: '300px' }}
                                    />
                                </span>
                            );
                        }
                        return <MarkdownImage {...props} />;
                    },
                }}
            >
                {contents}
            </ReactMarkdown>
        </div>
    );
}

export default Preview;
