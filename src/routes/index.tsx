import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    const navigate = useNavigate({});

    return (
        <div className="flex h-full items-center justify-center">
            <button
                className="btn btn-success"
                onClick={() => {
                    navigate({
                        to: '/workspace',
                        search: { file: 'new' },
                    });
                }}
            >
                New
            </button>
        </div>
    );
}
