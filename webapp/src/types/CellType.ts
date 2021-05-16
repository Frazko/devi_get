export type CellType = {
  index: number;
  value: number;
  xpos: number;
  ypos: number;
  flagged: boolean;
  mine: boolean;
  revealed: boolean;
  //@ts-ignore
  onCellSelected?: ({x, y, id}) => void;
  //@ts-ignore
  onCellFlagged?: ({x, y, id}) => void;
  gameOver?: boolean;
};
