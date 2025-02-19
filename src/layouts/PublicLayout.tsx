import { PropsWithChildren } from 'react';

function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="w-full">
            <main>{children}</main>
        </div>
    );
}

export default PublicLayout;
