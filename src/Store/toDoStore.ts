import create from 'zustand';
import { v4 } from 'uuid';

interface ToDo {
  id: string;
  title: string;
}

interface ToDoStore {
  items: ToDo[];
  createItem: (title: string) => void;
  updateItem: (id: string, title: string) => void;
  removeItem: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  items: [
    {
      id: 'dasd3',
      title: 'example1',
    },
    {
      id: 'dasd332',
      title: 'example2',
    },
  ],
  createItem: (title) => {
    const { items } = get();

    const newItem = {
      id: v4(),
      title,
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
  removeItem: (id: string) => {
    const { items } = get();
    set({
      items: items.filter((item) => item.id !== id),
    });
  },
}));
