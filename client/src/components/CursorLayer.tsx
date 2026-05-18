import { usePresenceStore } from "../store/presenceStore";

const CursorLayer = () => {
  const cursors = usePresenceStore((state) => state.cursors);

  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: cursor.color,
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
      ))}
    </>
  );
};

export default CursorLayer;
