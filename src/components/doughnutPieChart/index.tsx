import { COLORS } from "@/utils/colors";
import * as d3 from "d3-shape";
import { ActivityIndicator, View } from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import ChartLabel from "./labels";
import usePressFunctions from "./pressFunctions.hooks";
import ChartSegment from "./segments";

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  radius = 80,
  strokeWidth = 40,
  onSegmentPress,
  onPress = () => {},
}) => {
  const { activeIndex, handleSegmentPress, handlePressIn, handlePressOut } =
    usePressFunctions(onPress, onSegmentPress);

  const isInvalidData =
    !Array.isArray(data) ||
    data.length === 0 ||
    data.some((a) => isNaN(a?.value));

  if (isInvalidData) {
    return <ActivityIndicator size="small" color={COLORS.black} />;
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const pieData = d3
    .pie<DataItem>()
    .value((d) => d.value)
    .padAngle(0.04)(data);

  const svgSize = radius * 3.2;

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={svgSize} height={svgSize - 40}>
        <G x={svgSize / 2} y={svgSize / 2}>
          {pieData.map((slice, index) => (
            <ChartSegment
              key={`segment-${index}`}
              slice={slice}
              index={index}
              radius={radius}
              strokeWidth={strokeWidth}
              isActive={index === activeIndex}
              onPress={() => handleSegmentPress(slice.data)}
              onPressIn={() => handlePressIn(index)}
              onPressOut={handlePressOut}
            />
          ))}

          {pieData.map((slice, index) => (
            <ChartLabel
              key={`label-${index}`}
              slice={slice}
              radius={radius}
              totalValue={totalValue}
            />
          ))}
        </G>
        <Circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius - strokeWidth}
          fill="#FFFFFF"
        />
      </Svg>
    </View>
  );
};

export default DoughnutChart;
