import {PropsWithChildren} from "react";

export type BaseComponentProps<T = unknown> = PropsWithChildren<{
    className?: string;
} & T>
