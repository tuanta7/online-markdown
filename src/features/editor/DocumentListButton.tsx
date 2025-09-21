import { FolderOpenIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';

function DocumentListButton() {
    const { refetch, isFetching } = useQuery({
        queryKey: ['documents'],
        queryFn: () =>
            apiClient.sendRequest('GET', '/documents', {
                withCredentials: true,
            }),
    });

    const handleClick = async () => {
        const result = await refetch();
        console.log('Documents:', result.data);
    };

    return (
        <button className="btn" onClick={handleClick} disabled={isFetching}>
            <FolderOpenIcon className="h-4 w-4" />
            <span className="hidden md:inline">Open</span>
        </button>
    );
}

export default DocumentListButton;
