interface DataItem {
  item: string;
  value: number;
  color: string;
}

interface DoughnutChartProps {
  data: DataItem[];
  radius?: number;
  strokeWidth?: number;
  onSegmentPress?: (data: DataItem) => void;
  onPress?: (...args: any[]) => void;
}

interface ChartSegmentProps {
  slice: d3.PieArcDatum<DataItem>;
  index: number;
  radius: number;
  strokeWidth: number;
  isActive: boolean;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: (event: any) => void;
}

interface ChartLabelProps {
  slice: d3.PieArcDatum<DataItem>;
  radius: number;
  totalValue: number;
}
