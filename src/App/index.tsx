import React from 'react';
import { useToDoStore } from '../Store/toDoStore';
import { InputAdd } from '../components/InputAdd';
import { ToDoItem } from '../components/ToDoItem';

import styles from './index.module.scss';

//Создаем ф-ый компонент и из стейта вытаскиваем все задачи и методы
export const App: React.FC = () => {
  const [items, createItem, updateItem, doneItem, removeItem] = useToDoStore((state) => [
    state.items,
    state.createItem,
    state.updateItem,
    state.doneItem,
    state.removeItem,
  ]);
  console.log(items);

  // Пишем верстку, где создаем компонент нашей задачи, и в пропсы прокидываем все методы, также реализуем условие
  // если нет задач то показывать текст
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Todo's</h1>
      <section className={styles.articleSection}>
        <InputAdd
          onAdd={(title) => {
            if (title) {
              createItem(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!items.length && <p className={styles.articleText}>Здесь пока ничего нет ...</p>}
        {items.map((item) => (
          <ToDoItem
            key={item.id}
            id={item.id}
            title={item.title}
            isComplited={doneItem}
            isEdited={updateItem}
            isRemoved={removeItem}
          />
        ))}
      </section>
    </article>
  );
};
