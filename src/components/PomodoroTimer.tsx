import Button from './Button.tsx';
import { ClockIcon, PauseCircleIcon, PlayIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type TimeSelectorProps = {
    setSelected: (selector: number) => void;
    minutes: number[];
    disabled: boolean;
};

function MinutesSelector({ setSelected, minutes, disabled }: TimeSelectorProps) {
    return minutes.map((m) => (
        <Button
            key={m}
            className="btn btn-sm border border-secondary w-16"
            onClick={() => setSelected(m)}
            disabled={disabled}
        >
            {m + ':00'}
        </Button>
    ));
}

function PomodoroTimer() {
    const [running, setRunning] = useState<boolean>(false);
    const [isBreaking, setIsBreaking] = useState<boolean>(false);
    const [remainingSeconds, setRemainingSeconds] = useState<number>(25 * 60);
    const intervalID = useRef<ReturnType<typeof setInterval>>();

    const { setValue } = useForm({
        defaultValues: {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
            interval: 4,
        },
    });

    const renderClock = () => {
        const seconds = remainingSeconds % 60;
        const minutes = (remainingSeconds - seconds) / 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const clearTimer = useCallback(() => {
        if (intervalID.current) {
            clearInterval(intervalID.current);
            intervalID.current = undefined;
        }
        setRunning(false);
        setIsBreaking(false);
    }, []);

    const startTimer = useCallback(() => {
        setRunning(true);
        intervalID.current = setInterval(() => {
            if (remainingSeconds <= 0) {
                setIsBreaking(!isBreaking);
                setRemainingSeconds(isBreaking ? 15 : 25);
                return;
            }
            setRemainingSeconds((p) => p - 1);
        }, 1000);
    }, [isBreaking, remainingSeconds]);

    const handleCountdown = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (running) {
                clearTimer();
            } else {
                startTimer();
            }
        },
        [running, startTimer, clearTimer]
    );

    useEffect(() => {
        return () => clearTimer(); // clean up function
    }, [clearTimer]);

    return (
        <div className="flex flex-col border rounded-xl p-4 gap-6 w-80">
            <progress className="progress" value={remainingSeconds} max={100}></progress>
            <div className="flex items-center justify-between gap-3">
                <div className="text-7xl font-semibold">{renderClock()}</div>
                <div className="flex flex-col justify-between gap-3">
                    <Button className="btn btn-sm" onClick={() => setRemainingSeconds((p) => p + 300)}>
                        + 5 min
                    </Button>
                    <Button className="btn btn-sm" onClick={(e) => handleCountdown(e)}>
                        {running ? <PauseCircleIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">Settings</span>
                </div>
                <div className="collapse-content flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-6">
                        <span className="font-semibold text-sm">Pomodoro</span>
                        <div className="grid grid-cols-3 gap-3">
                            <MinutesSelector
                                setSelected={(val) => {
                                    setValue('pomodoro', val);
                                    setRemainingSeconds(val * 60);
                                }}
                                minutes={[25, 30, 35]}
                                disabled={running}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PomodoroTimer;
