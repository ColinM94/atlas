import * as React from "react";

import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface TableProps<T> {
  data: T[];
  items: (data: T, index: number) => Cell[];
  onRowClick?: (data: T) => void;
  keyExtractor: (data: T) => string;
  rowHeight?: number;
  overscan?: number;
}

interface CellBase {
  id: string;
  heading?: string;
}

interface CellImage extends CellBase {
  url: string;
  type: "image";
}

interface CellText extends CellBase {
  type: "text";
  value: string;
}

type Cell = CellText | CellImage;

interface Row<T> {
  id: string;
  cells: Cell[];
  data: T;
}

export const Table = <T,>(props: TableProps<T>) => {
  const {
    data,
    items,
    keyExtractor,
    onRowClick,
    rowHeight = 40,
    overscan = 5,
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });

  const rows: Row<T>[] = data.map((dataItem, index) => ({
    id: keyExtractor(dataItem),
    cells: items(dataItem, index),
    data: dataItem,
  }));

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;

    const startIndex = Math.floor(scrollTop / rowHeight) - overscan;
    const endIndex =
      Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan;

    setVisibleRange({
      start: Math.max(0, startIndex),
      end: Math.min(rows.length - 1, endIndex),
    });
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    handleScroll();
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [rows.length]);

  const beforeHeight = visibleRange.start * rowHeight;
  const afterHeight = (rows.length - visibleRange.end - 1) * rowHeight;

  return (
    <div ref={containerRef} className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {rows[0]?.cells.map((cell) => (
              <th key={`heading_${cell.id}`} className={styles.heading}>
                {cell.heading || ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {beforeHeight > 0 && (
            <tr style={{ height: beforeHeight }}>
              <td colSpan={rows[0]?.cells.length} />
            </tr>
          )}

          {rows
            .slice(visibleRange.start, visibleRange.end + 1)
            .map((row, index) => (
              <tr
                key={row.id}
                className={classes(
                  styles.row,
                  onRowClick && styles.rowClickable,
                  (visibleRange.start + index) % 2 === 0
                    ? styles.rowEvens
                    : styles.rowOdd
                )}
                onClick={() => onRowClick?.(row.data)}
                style={{ height: rowHeight }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.id} className={styles[`${cell.type}Cell`]}>
                      {cell.type === "text" && cell.value}
                      {cell.type === "image" && (
                        <img src={cell.url} className={styles.image} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

          {afterHeight > 0 && (
            <tr style={{ height: afterHeight }}>
              <td colSpan={rows[0]?.cells.length} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
