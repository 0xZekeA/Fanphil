import * as d3 from "d3-shape";
import { memo } from "react";
import { G, Text } from "react-native-svg";

const ChartLabel = memo(({ slice, radius, totalValue }: ChartLabelProps) => {
  const arc = d3
    .arc<d3.PieArcDatum<DataItem>>()
    .innerRadius(radius + 20)
    .outerRadius(radius + 30);

  const [labelX, labelY] = arc.centroid(slice);
  const percentage = ((slice.data.value / totalValue) * 100).toFixed(1);

  return (
    <G>
      <Text
        x={labelX}
        y={labelY + 3}
        fontSize="12"
        fontWeight="bold"
        fill={slice.data.color}
        textAnchor="middle"
      >
        {`${percentage}%`}
      </Text>
      <Text
        x={labelX}
        y={labelY + 15}
        fontSize="10"
        fill="#333"
        textAnchor="middle"
      >
        {slice.data.item}
      </Text>
    </G>
  );
});

ChartLabel.displayName = "ChartLabel";
export default ChartLabel;
