import React from 'react';
import { usePreviewStore } from '../store/previewStore';

const Sidebar: React.FC = () => {
    const sideBySide = usePreviewStore((state) => state.sideBySide);
    const setSideBySide = usePreviewStore((state) => state.setSideBySide);

    return (
        <div className="flex h-screen flex-col">
            <div className="flex flex-1 flex-col items-start gap-8 p-6">
                <h2 className="text-lg font-bold">Settings</h2>
                <label className="flex w-full cursor-pointer items-center justify-between gap-3">
                    <span className="text-base">Side Preview</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={sideBySide}
                        onChange={(e) => setSideBySide(e.target.checked)}
                    />
                </label>
                <label className="flex w-full cursor-pointer items-center justify-between gap-3">
                    <span className="text-base">Rounded Images</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={sideBySide}
                        onChange={(e) => setSideBySide(e.target.checked)}
                    />
                </label>
            </div>
            <audio controls className="w-full">
                <source
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    type="audio/mpeg"
                    className=""
                />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default Sidebar;
