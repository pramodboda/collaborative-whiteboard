// import { create } from "zustand";
// import type { Cursor } from "../types/presence";

// interface PresenceState {
//   cursors: Cursor[];

//   updateCursor: (cursor: Cursor) => void;
// }

// export const usePresenceStore = create<PresenceState>((set, get) => ({
//   cursors: [],

//   updateCursor: (cursor) => {
//     const existing = get().cursors;

//     const found = existing.find((c) => c.userId === cursor.userId);

//     if (found) {
//       set({
//         cursors: existing.map((c) => (c.userId === cursor.userId ? cursor : c)),
//       });
//     } else {
//       set({
//         cursors: [...existing, cursor],
//       });
//     }
//   },
// }));
