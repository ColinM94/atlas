import * as React from 'react';

import { Icon } from 'components/icon/icon';
import { FormField } from 'components/formField/formField';
import { classes } from 'utils/classes';

import styles from './styles.module.scss';
import { InputTextProps } from './types';

export const InputText = (props: InputTextProps) => {
  const {
    value,
    setValue,
    className,
    inputClassName,
    type,
    placeholder,
    disabled,
    onKeyDown,
    rightText,
    children,
    actionIcon,
    onActionClick,
    focusOnLoad,
    characterLimit,
    showDisabledStyle = true,
    layer = 1,
    ref,
    ...rest
  } = props;

  const inputField = ref || React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let temp = e.target.value;

    if (characterLimit) {
      temp = temp.slice(0, characterLimit);
    }

    setValue?.(temp, e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault();
    else onKeyDown?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (focusOnLoad) {
      inputField.current?.focus();
    }
  }, [focusOnLoad]);

  return (
    <FormField className={classes(className, styles.container)} {...rest}>
      <input
        type={type || 'text'}
        value={value}
        onChange={handleChange}
        className={classes(
          styles.input,
          inputClassName,
          styles[`layer${layer}`],
          disabled && showDisabledStyle && styles.disabled
        )}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={ref || inputField}
      />

      {rightText && <div className={styles.rightText}>{rightText}</div>}

      {actionIcon && (
        <div
          onClick={onActionClick}
          className={classes(styles.actionContainer, onActionClick && styles.clickable)}
        >
          <Icon icon={actionIcon} className={styles.actionIcon} />
        </div>
      )}

      {children}

      {characterLimit && (
        <div
          className={classes(
            styles.characterLimit,
            value && value.length >= characterLimit && styles.maxCap
          )}
        >
          {value?.length}/{characterLimit}
        </div>
      )}
    </FormField>
  );
};
