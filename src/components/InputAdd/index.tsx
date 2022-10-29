import React, { useCallback, useState } from 'react';

import styles from './index.module.scss';

interface InputAddProps {
  onAdd: (title: string) => void;
}

export const InputAdd: React.FC<InputAddProps> = ({ onAdd }) => {
  const [inputValue, SetInputValue] = useState('');
  const addItem = useCallback(() => {
    onAdd(inputValue);
    SetInputValue('');
  }, [inputValue]);
  return (
    <div className={styles.inputAdd}>
      <input
        type="text"
        className={styles.inputAddValue}
        value={inputValue}
        onChange={(event) => {
          SetInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addItem();
          }
        }}
        placeholder="Есть новое дело?"
      />
      <button onClick={addItem} aria-label="Add" className={styles.inputAddBtn}></button>
    </div>
  );
};
