import * as React from "react";
import { MaterialSymbol } from "material-symbols";

import { classes } from "utils/classes";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";

interface TableProps<T> {
  data: T[];
  items: (dataItem: T, index: number) => Cell[];
  onRowClick?: (dataItem: T) => void;
  keyExtractor: (dataItem: T) => string;
  rowHeight?: number;
  overscan?: number;
}

interface CellBase {
  id: string;
  onClick?: () => void;
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

interface CellButton extends CellBase {
  type: "button";
  icon: MaterialSymbol;
}

type Cell = CellText | CellImage | CellButton;

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

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [overscan, rowHeight, rows.length]);

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
            .map((row, index) => {
              const isEvenRow = (visibleRange.start + index) % 2 === 0;

              return (
                <tr
                  key={row.id}
                  onKeyDown={(e) => console.log(e.key)}
                  onClick={() => {
                    onRowClick?.(row.data);
                  }}
                  style={{ height: rowHeight }}
                  className={classes(
                    styles.row,
                    onRowClick && styles.rowClickable,
                    isEvenRow ? styles.rowEven : styles.rowOdd
                  )}
                >
                  {row.cells.map((cell) => {
                    const isCellClickable =
                      cell.type !== "button" && Boolean(cell?.onClick);

                    return (
                      <td
                        key={cell.id}
                        onClick={(e) => {
                          if (!isCellClickable) return;
                          e.stopPropagation();
                          cell.onClick?.();
                        }}
                        className={classes(
                          styles[`${cell.type}Cell`],
                          isCellClickable && styles.cellClickable
                        )}
                      >
                        {cell.type === "text" && cell.value}

                        {cell.type === "image" && (
                          <img src={cell.url} className={styles.image} />
                        )}

                        {cell.type === "button" && (
                          <Button
                            type="secondary"
                            icon={cell.icon}
                            onClick={cell?.onClick}
                            layer={2}
                            className={styles.button}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

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
