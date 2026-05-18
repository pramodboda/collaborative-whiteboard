import { useBoardStore } from "../store/boardStore";

interface Props {
  onClear: () => void;
}

const Toolbar = ({ onClear }: Props) => {
  const { color, size, setColor, setSize } = useBoardStore();

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: 10,
      }}
    >
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        type="range"
        min={1}
        max={20}
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />

      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default Toolbar;
