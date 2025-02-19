import Button from '../../components/Button.tsx';

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

export default MinutesSelector;
