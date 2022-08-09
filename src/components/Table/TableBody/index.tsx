import React, { ReactChildren, ReactChild, FC } from 'react';
import classnames from 'classnames';
import styles from '../table.module.scss';

type TableItem = {
    [k: string]: string | number | any | boolean | Array<any> | null;
};

interface BodyProps {
    tableData: TableItem[];
    content(row: { [k: string]: string | any | number | boolean | Array<string | number> | null }, index: number): ReactChildren | ReactChild;
    cols: number;
    image?: string;
    placeholderText?: string;
    theme?: 'secondary';
    onClick?: (row: any) => void;
}

const TableBody: FC<BodyProps> = ({ tableData, content, cols, image, placeholderText, theme, onClick }: BodyProps) => {
    TableBody.defaultProps = {
        image: '',
        placeholderText: '',
        theme: undefined,
        onClick: () => { undefined}
    };

    const handleClick = (row: any) => {
        if (onClick) onClick(row);
    };

    return (
        <tbody className="table__body">
            {!tableData?.length && (
                <tr>
                    <td className="" colSpan={cols}>
                        <div className="flex flex__center mt-9">
                            {/* <img src={!image ? placeholder : image} alt="" /> */}
                        </div>
                        <div className="flex flex__center mt-1">
                            <p className={styles.emptyText}>{image && placeholderText}</p>
                        </div>
                    </td>
                </tr>
            )}
            {tableData?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr className={classnames(styles.table__row, styles[`table__row__${theme}`])} key={index} onClick={() => handleClick(row)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                    <>{content(row, index)}</>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
