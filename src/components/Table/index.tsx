/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, ReactChild, ReactChildren, FC } from 'react'
import TableHeader from './TableHeader.tsx'
import TableBody from './TableBody'
import styles from './table.module.scss'

export type Item = {
  [k: string]:
    | string
    | number
    | boolean
    | Array<string | number | { [k: string]: string | number }>
    | null
    | undefined
}

export interface TableProps {
  tableData: Item[]
  children(row: { [k: string]: string | number | any }, index: number): ReactChildren | ReactChild
  headers: Item[]
  type: string
  loading?: boolean
  emptyState?: string
  placeholderText?: string
  theme?: 'secondary'
  currentPage?: number | string
  total?: number | string
  perPage?: number | string
  fetchPage?: (page: number, pageItems: number) => void
  onClick?: (row: any) => void
}

const Table: FC<TableProps> = ({
  type,
  headers,
  children,
  tableData,
  loading,
  emptyState,
  placeholderText,
  theme,
  onClick,
}: TableProps) => {
  Table.defaultProps = {
    currentPage: 1,
    onClick: () => {
      undefined
    },
  }
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    setData(tableData)

    return () => {
      setData([])
    }
  }, [tableData])

  const sortRows = () => true

  const tableLoader = (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__head} />
      {headers?.slice(0, 4)?.map((_, index: number) => (
        <div key={index} className={styles.skeleton__row}>
              {headers?.map((header: string | Record<string, unknown>, idx: number) => (
            <div key={idx} className={styles.skeleton__item} />
          ))}
        </div>
      ))}
    </div>
  )

  const table = (
    <table className={`${styles.table}`}>
      <TableHeader type={type} sortRows={sortRows} tableHeaders={headers} theme={theme} />
      <TableBody
        cols={headers?.length}
        tableData={data}
        content={children}
        image={emptyState}
        placeholderText={placeholderText}
        theme={theme}
        onClick={onClick}
      />
    </table>
  )

  return loading ? tableLoader : table
}

export default Table
