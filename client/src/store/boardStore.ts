import { create } from "zustand";

interface BoardState {
  color: string;
  size: number;

  setColor: (color: string) => void;
  setSize: (size: number) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  color: "#000000",
  size: 3,

  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
}));
