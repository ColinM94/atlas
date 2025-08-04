import { DivClickEvent, Layer } from 'types/general';

interface Props {
  layer: Layer;
  onClick: (event: DivClickEvent) => void;
}

export const Surface = (props: Props) => {
  const { layer, onClick } = props;

  return <div className={styles}></div>;
};
