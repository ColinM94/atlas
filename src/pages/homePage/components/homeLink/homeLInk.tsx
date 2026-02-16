import { classes } from 'utils/classes';

import styles from './styles.module.scss';

interface Props {
  href: string;
  title: string;
  image: string;
  className?: string;
  imageClassName?: string;
}
export const HomeLink = (props: Props) => {
  const { href, title, image, className, imageClassName } = props;
  return (
    <a target="_blank" href={href} title={title} className={classes(styles.container, className)}>
      <img src={image} className={classes(styles.image, imageClassName)} />
    </a>
  );
};
