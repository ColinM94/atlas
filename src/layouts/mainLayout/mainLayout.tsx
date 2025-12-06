import { useLocation } from 'wouter';

import { Children, Layout } from 'types/general';
import { ButtonProps } from 'components/button/types';
import { Navbar } from 'components/navbar/navbar';
import { classes } from 'utils/classes';

import { Header } from './components/header/header';
import styles from './styles.module.scss';

interface Props {
  buttons?: ButtonProps[];
  layout?: Layout;
  onLayoutClick?: () => void;
  onAddClick?: () => void;
  children: Children;
  className?: string;
}

export const MainLayout = (props: Props) => {
  const [location] = useLocation();

  const { children, buttons, layout, onLayoutClick, onAddClick, className } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {location !== '/' && (
            <Header
              buttons={buttons}
              layout={layout}
              onLayoutClick={onLayoutClick}
              onAddClick={onAddClick}
            />
          )}

          <div className={classes(styles.content, className)}>{children}</div>
        </div>
      </div>

      <Navbar />
    </>
  );
};
