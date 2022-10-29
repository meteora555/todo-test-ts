import React from 'react';

import styles from './index.module.scss';

interface ToDoItemProps {
  id: string;
  title: string;
  isDone: (id: string) => void;
  isEdited: (id: string, title: string) => void;
  isRemoved: (id: string) => void;
}

export const ToDoItem: React.FC<ToDoItemProps> = ({ id, title, isDone, isEdited, isRemoved }) => {
  return <div className={styles.inputAdd}>{title}</div>;
};
