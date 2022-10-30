import create from 'zustand';
import { v4 } from 'uuid';

//Описываем интерфейс для нашей задачи
interface ToDo {
  id: string;
  title: string;
  isDone: boolean;
}
//Описываем интерфейс для нашего стейта, в нем все наши задачи и методы
interface ToDoStore {
  items: ToDo[];
  createItem: (title: string) => void;
  updateItem: (id: string, title: string) => void;
  doneItem: (id: string, isDone: boolean) => void;
  removeItem: (id: string) => void;
}
//Создаем наш стейт, и в нем реализовываем логику наших методов, создать обновить, выполнено, удалить
export const useToDoStore = create<ToDoStore>((set, get) => ({
  items: [],
  createItem: (title) => {
    const { items } = get();

    const newItem = {
      id: v4(),
      title,
      isDone: false,
    };

    set({
      items: [newItem].concat(items),
    });
  },
  updateItem: (id: string, title: string) => {
    const { items } = get();
    set({
      items: items.map((item) => ({
        ...item,
        title: item.id === id ? title : item.title,
      })),
    });
  },
  doneItem: (id: string, isDone: boolean) => {
    const { items } = get();
    set({
      items: items.map((item) => ({
        ...item,
        isDone: isDone ? true : false,
      })),
    });
  },
  removeItem: (id: string) => {
    const { items } = get();
    set({
      items: items.filter((item) => item.id !== id),
    });
  },
}));
