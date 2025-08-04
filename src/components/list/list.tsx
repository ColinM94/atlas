import React from "react";

import { classes } from "utils/classes";
import { swapArrayElements } from "utils/swapArrayElements";

import { ListItem } from "./components/listItem/listItem";
import styles from "./styles.module.css";
import { ListProps } from "./types";

export const List = <T,>(props: ListProps<T>) => {
  const { items, setItems, onDeleteClick, keyExtractor } = props;

  const [draggedIndex, setDraggedIndex] = React.useState<null | number>(null);
  const [dropZoneIndex, setDropZoneIndex] = React.useState<null | number>(null);
  const [mouse, setMouse] = React.useState<[number, number]>([0, 0]);
  const [animationDisabled, setAnimationDisabled] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse([e.x, e.y]);
    };

    // const handleTouchMove = (e: TouchEvent) => {
    //   e.preventDefault();

    //   setMouse([e.touches[0].clientX, e.touches[0].clientY]);
    // };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseUp = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    if (dropZoneIndex === null || draggedIndex === null) return;

    const adjustedDropZoneIndex =
      draggedIndex >= dropZoneIndex ? dropZoneIndex : dropZoneIndex - 1;

    const updatedItems = swapArrayElements(
      items,
      draggedIndex,
      adjustedDropZoneIndex
    );

    setItems(updatedItems);

    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  });

  React.useEffect(() => {
    if (draggedIndex !== null) {
      const elements = Array.from(document.getElementsByClassName("dropZone"));
      const positions = elements.map((e) => e.getBoundingClientRect().top);
      const absDifferences = positions.map((v) => Math.abs(v - mouse[1]));
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result >= draggedIndex) {
        result += 1;
      }

      setAnimationDisabled(dropZoneIndex === null);

      setDropZoneIndex(result);
    }
  }, [draggedIndex, mouse]);

  return (
    <div className={styles.container}>
      {items.map((item, index) => {
        const isDragged = draggedIndex === index;

        return (
          <React.Fragment key={keyExtractor(item)}>
            {!isDragged && (
              <ListItem
                description={"description"}
                onDeleteClick={() => {}}
                className={classes(
                  "dropZone",
                  styles.dropZone,
                  dropZoneIndex === index && styles.dropZoneShow,
                  dropZoneIndex !== index && styles.dropZoneHide,
                  (animationDisabled || !Boolean(draggedIndex)) &&
                    styles.dropZoneNoTransition
                )}
              />
            )}

            <ListItem
              description={item.description}
              onDeleteClick={() => onDeleteClick(item)}
              onMouseDown={(e) => {
                e.preventDefault();
                setDraggedIndex(index);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                setDraggedIndex(index);
              }}
              style={{
                ...(isDragged && {
                  left: `${mouse[0]}px`,
                  top: `${mouse[1]}px`,
                }),
              }}
              className={classes(styles.item, isDragged && styles.draggedItem)}
            />
          </React.Fragment>
        );
      })}

      {draggedIndex !== items.length && (
        <ListItem
          description={"description"}
          onDeleteClick={() => {}}
          className={classes(
            "dropZone",
            styles.dropZone,
            dropZoneIndex === items.length && styles.dropZoneShow,
            dropZoneIndex !== items.length && styles.dropZoneHide,
            (animationDisabled || !Boolean(draggedIndex)) &&
              styles.dropZoneNoTransition
          )}
        />
      )}
    </div>
  );
};
