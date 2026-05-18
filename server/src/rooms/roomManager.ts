const roomBoards = new Map<string, any[]>();

export const saveElement = (roomId: string, element: any) => {
  if (!roomBoards.has(roomId)) {
    roomBoards.set(roomId, []);
  }

  roomBoards.get(roomId)?.push(element);
};

export const removeElement = (roomId: string, elementId: string) => {
  const elements = roomBoards.get(roomId) || [];

  roomBoards.set(
    roomId,
    elements.filter((e) => e.id !== elementId),
  );
};
