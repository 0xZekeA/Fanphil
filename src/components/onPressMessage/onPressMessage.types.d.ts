interface PressPosition {
  x: number;
  y: number;
}

interface OnpressMessageProps {
  visible: boolean;
  onClose: () => void;
  position: PressPosition;
  text: string;
  width?: number;
}
