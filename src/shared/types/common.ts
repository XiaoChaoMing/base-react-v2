export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
    isLoading: boolean;
    error?: string;
}

export interface AsyncState<T> extends LoadingState {
    data?: T;
}

export type Theme = 'light' | 'dark' | 'system';

export interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}