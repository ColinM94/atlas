import { Button } from 'components/button/button';
import { ButtonProps } from 'components/button/types';
import { Layout } from 'types/general';

import styles from './styles.module.scss';

interface Props {
  buttons: (ButtonProps & { hidden: boolean })[] | undefined;
  layout: Layout | undefined;
  onLayoutClick: (() => void) | undefined;
  onAddClick: (() => void) | undefined;
}

export const Header = (props: Props) => {
  const { buttons, layout, onAddClick, onLayoutClick } = props;

  const renderButtons = () => {
    const temp: Props['buttons'] = [];

    if (layout) {
      temp.push({
        type: 'secondary',
        icon: layout === 'compact' ? 'dashboard' : 'list',
        hidden: false,
        onClick: onLayoutClick,
      });
    }

    if (onAddClick) {
      temp.push({
        type: 'secondary',
        icon: 'add',
        onClick: onAddClick,
        hidden: false,
      });
    }

    temp.push(...(buttons || []));
    return temp;
  };

  if (renderButtons().length === 0 || renderButtons().every((button) => button.hidden)) return null;

  return (
    <div className={styles.container}>
      {/* <Button
        icon="arrow_back"
        type="secondary"
        onClick={() => history.back()}
        layer={0}
        className={styles.backButton}
      /> */}

      <div className={styles.buttons}>
        {renderButtons().map((button) => {
          if (button.hidden) return;
          if (button) if (button.type === 'secondary') return <Button {...button} layer={0} />;

          return <Button {...button} />;
        })}
      </div>
    </div>
  );
};
