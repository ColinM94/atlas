import * as React from 'react';

import { Card, Icon } from 'components';
import { classes } from 'utils';

import styles from './styles.module.scss';
import { Props } from './types';

export const InputTextSuggestions = ({ suggestions, onClick, className }: Props) => {
  const [selectedSuggestion, setSelectedSuggestion] = React.useState<number>(0);

  const handleKeyboard = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && suggestions?.[selectedSuggestion]) {
        onClick?.(suggestions[selectedSuggestion].value);
      }

      if (!suggestions?.length) return;

      if (e.key === 'ArrowDown') {
        setSelectedSuggestion((prev) => {
          if (prev >= suggestions?.length - 1) return Number(suggestions?.length - 1);
          return prev + 1;
        });
      } else if (e.key === 'ArrowUp') {
        setSelectedSuggestion((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }
    },
    [selectedSuggestion, suggestions]
  );

  React.useEffect(() => {
    setSelectedSuggestion(0);
  }, [suggestions]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return (
    <Card className={classes(styles.container, className)}>
      <div className={styles.selectedTagsContainer}>
        {suggestions?.slice(0, 10).map((suggestion, index) => (
          <div
            className={classes(
              styles.suggestion,
              selectedSuggestion === index && styles.selectedSuggestion
            )}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              onClick?.(suggestion.value);
            }}
            key={suggestion.value}
          >
            <div className={styles.suggestionText}>{suggestion.label}</div>

            {selectedSuggestion === index && <Icon icon="add" className={styles.icon} />}
          </div>
        ))}
      </div>
    </Card>
  );
};
