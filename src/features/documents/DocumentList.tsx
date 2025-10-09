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

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function DocumentList() {
    const { data, isLoading, error, refetch } = useQuery<DocumentListResponse>({
        queryKey: ['documents'],
        queryFn: () =>
            apiClient.sendRequest('GET', '/documents', {
                withCredentials: true,
            }),
    });

    const [search, setSearch] = useState('');
    const filteredDocs = data?.documents?.filter((doc) => doc.name.toLowerCase().includes(search.toLowerCase())) ?? [];

    const documentList = (
        <ul className="flex-1 overflow-y-auto">
            {filteredDocs.length === 0 && <li className="text-center text-neutral-400">No documents found</li>}
            {filteredDocs.map((doc) => (
                <li
                    key={doc.id}
                    className="hover:bg-primary/10 active:bg-primary/20 mb-2 flex cursor-pointer items-center gap-2 rounded pr-3"
                >
                    {doc.isFolder ? <span className="text-xl">📁</span> : <span className="text-xl">📄</span>}
                    <span className="truncate font-medium">{doc.name}</span>
                    <span className="ml-auto truncate text-xs text-neutral-400">{doc.type}</span>
                </li>
            ))}
        </ul>
    );

    const render = () => {
        if (isLoading) return <div>Loading documents...</div>;
        if (error) return <div className="text-error">Error loading documents</div>;
        return documentList;
    };

    return (
        <div className="flex h-full flex-col py-2">
            <div className="mb-4 flex items-center gap-3">
                <h2 className="flex-1 text-lg font-bold">Documents</h2>
                <input
                    type="text"
                    className="input input-sm input-bordered w-32"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-xs btn-outline flex items-center" onClick={() => refetch()}>
                    <ArrowPathIcon className="h-4 w-4" />
                </button>
            </div>
            {render()}
        </div>
    );
}

export default DocumentList;
