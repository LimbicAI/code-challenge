import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import styles from './Modal.module.scss';

export interface Props {
    children: ReactNode;
    isOpen: boolean;
    isClose: () => void;
    style?: object;
    defaultWidth?: boolean;
    padding?: string;
}

const Modal = ({ children, isOpen, isClose, style, defaultWidth, padding }: Props) => (
    <Dialog open={isOpen} onClose={isClose} className={styles.modal}>
        <div className={defaultWidth ? styles.defaultWidth : styles.modal_content} style={{ padding }}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" style={style} />
            <div className="relative bg-white rounded max-w-sm mx-auto">{children}</div>
        </div>
    </Dialog>
);

export default Modal;
