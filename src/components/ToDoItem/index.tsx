import React, { useState, useRef, useEffect } from 'react';
import { useToDoStore } from '../../Store/toDoStore';

import styles from './index.module.scss';

//Описываем интерфейс с типами наших пропсов компонента задачи
interface ToDoItemProps {
  id: string;
  title: string;
  isComplited: (id: string) => void;
  isEdited: (id: string, title: string) => void;
  isRemoved: (id: string) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  title,
  isComplited,
  isEdited,
  isRemoved,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);
  const editText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      editText?.current?.focus();
    }
  }, [isEdit]);

  return (
    <div className={styles.ToDoItem}>
      <label className={styles.ToDoItemLabel}>
        <input
          type="checkbox"
          disabled={isEdit}
          className={styles.ToDoItemCheckbox}
          onChange={() => {
            isComplited(id);
          }}
        />
        {isEdit ? (
          <input
            value={value}
            ref={editText}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                isEdited(id, value);
                setIsEdit(false);
              }
            }}
            className={styles.ToDoItemFix}
          />
        ) : (
          <h3 className={styles.ToDoItemTitle}>{title}</h3>
        )}
      </label>
      {isEdit ? (
        <button
          aria-label="Сохранить"
          className={styles.ToDoItemSave}
          onClick={() => {
            isEdited(id, value);
            setIsEdit(false);
          }}
        />
      ) : (
        <button
          aria-label="Ред."
          className={styles.ToDoItemEdit}
          onClick={() => {
            setIsEdit(true);
          }}
        />
      )}
      <button
        aria-label="Удалить"
        className={styles.ToDoItemRemove}
        onClick={() => isRemoved(id)}
      />
    </div>
  );
};
