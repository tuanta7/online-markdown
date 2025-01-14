import {ButtonProps} from "../common/types.ts";

function Button({ isLoading, children, ...rest }: ButtonProps) {
    const c = isLoading ? "Loading..." : children;
    return <button {...rest}>{c}</button>;
}

export default Button;