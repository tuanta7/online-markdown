import { FolderOpenIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../services/apiClient';

export interface Document {
    id: string;
    name: string;
    type: string;
    isFolder: boolean;
}

interface DocumentListResponse {
    page: number;
    status: string;
    documents: Document[];
}

function DocumentList() {
    const { data, isLoading, error, refetch } = useQuery<DocumentListResponse>({
        queryKey: ['documents'],
        queryFn: () =>
            apiClient.sendRequest('GET', '/documents', {
                withCredentials: true,
            }),
    });

    if (isLoading) return <div>Loading documents...</div>;
    if (error) return <div className="text-error">Error loading documents</div>;

    return (
        <div className="flex flex-col gap-2">
            <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">Documents</span>
                <button className="btn btn-xs" onClick={() => refetch()}>
                    <FolderOpenIcon className="h-4 w-4" />
                    Refresh
                </button>
            </div>
            <ul className="">
                {data?.documents?.map((doc) => (
                    <li key={doc.id} className="hover:bg-base-200 flex cursor-pointer items-center">
                        {doc.isFolder ? <span className="font-bold">📁</span> : <span className="font-bold">📄</span>}
                        <span className="truncate">{doc.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DocumentList;
