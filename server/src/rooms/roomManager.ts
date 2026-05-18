const roomBoards = new Map<string, any[]>();

export const saveStroke = (roomId: string, data: any) => {
  if (!roomBoards.has(roomId)) {
    roomBoards.set(roomId, []);
  }

  roomBoards.get(roomId)?.push(data);
};

export const getBoardData = (roomId: string) => {
  return roomBoards.get(roomId) || [];
};

export const clearBoard = (roomId: string) => {
  roomBoards.set(roomId, []);
};
