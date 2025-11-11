import { useState } from 'react';

function AttachmentList() {
    const [search, setSearch] = useState('');

    return (
        <div className="flex h-full flex-col py-2">
            <div className="mb-4 flex items-center gap-3">
                <h2 className="flex-1 text-lg font-bold">Attachments</h2>
                <input
                    type="text"
                    className="input input-sm input-bordered w-32"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default AttachmentList;
