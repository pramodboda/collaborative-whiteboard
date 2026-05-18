// import { create } from "zustand";

// interface BoardState {
//   color: string;
//   size: number;

//   setColor: (color: string) => void;
//   setSize: (size: number) => void;
// }

// export const useBoardStore = create<BoardState>((set) => ({
//   color: "#000000",
//   size: 3,

//   setColor: (color) => set({ color }),
//   setSize: (size) => set({ size }),
// }));

import { create } from "zustand";
import { type BoardElement } from "../types/drawing";
import type { Tool } from "../types/shape";

interface BoardState {
  color: string;
  size: number;
  tool: Tool;

  elements: BoardElement[];
  undone: BoardElement[];

  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setTool: (tool: Tool) => void;

  addElement: (element: BoardElement) => void;

  removeElement: (id: string) => void;

  undo: () => BoardElement | null;

  redo: () => BoardElement | null;

  clearBoard: () => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  color: "#000000",
  size: 4,
  tool: "pencil",

  elements: [],
  undone: [],

  setColor: (color) => set({ color }),

  setSize: (size) => set({ size }),

  setTool: (tool) => set({ tool }),

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
      undone: [],
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((e) => e.id !== id),
    })),

  undo: () => {
    const elements = [...get().elements];

    if (!elements.length) return null;

    const removed = elements.pop()!;

    set((state) => ({
      elements,
      undone: [...state.undone, removed],
    }));

    return removed;
  },

  redo: () => {
    const undone = [...get().undone];

    if (!undone.length) return null;

    const restored = undone.pop()!;

    set((state) => ({
      elements: [...state.elements, restored],
      undone,
    }));

    return restored;
  },

  clearBoard: () =>
    set({
      elements: [],
      undone: [],
    }),
}));
