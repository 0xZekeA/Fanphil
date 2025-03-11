import * as d3 from "d3-shape";
import { memo } from "react";
import { G, Path } from "react-native-svg";

const ChartSegment = memo(
  ({
    slice,
    index,
    radius,
    strokeWidth,
    isActive,
    onPress,
    onPressIn,
    onPressOut,
  }: ChartSegmentProps) => {
    const arcData = {
      ...slice,
      innerRadius: radius - strokeWidth,
      outerRadius: radius,
    };

    const arc = d3
      .arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(arcData.innerRadius)
      .outerRadius(arcData.outerRadius)
      .cornerRadius(strokeWidth / 4);

    return (
      <G
        key={index}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessible={true}
        accessibilityLabel={`${slice.data.item}: ${slice.data.value}`}
      >
        <Path
          d={arc(arcData) as string}
          fill={slice.data.color}
          stroke="#FFFFFF"
          strokeWidth={1}
          opacity={isActive ? 0.8 : 1}
          scale={isActive ? 1.05 : 1}
        />
      </G>
    );
  },
);

ChartSegment.displayName = "ChartSegment";
export default ChartSegment;
