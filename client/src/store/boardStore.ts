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
import { Stroke } from "../types/drawing";

interface BoardState {
  color: string;
  size: number;

  strokes: Stroke[];
  undoneStrokes: Stroke[];

  setColor: (color: string) => void;
  setSize: (size: number) => void;

  addStroke: (stroke: Stroke) => void;

  undo: () => void;
  redo: () => void;

  setStrokes: (strokes: Stroke[]) => void;

  clearBoard: () => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  color: "#000000",
  size: 3,

  strokes: [],
  undoneStrokes: [],

  setColor: (color) => set({ color }),

  setSize: (size) => set({ size }),

  addStroke: (stroke) =>
    set((state) => ({
      strokes: [...state.strokes, stroke],
      undoneStrokes: [],
    })),

  undo: () => {
    const strokes = [...get().strokes];

    if (!strokes.length) return;

    const removed = strokes.pop()!;

    set((state) => ({
      strokes,
      undoneStrokes: [...state.undoneStrokes, removed],
    }));
  },

  redo: () => {
    const undone = [...get().undoneStrokes];

    if (!undone.length) return;

    const restored = undone.pop()!;

    set((state) => ({
      strokes: [...state.strokes, restored],
      undoneStrokes: undone,
    }));
  },

  setStrokes: (strokes) => set({ strokes }),

  clearBoard: () =>
    set({
      strokes: [],
      undoneStrokes: [],
    }),
}));
