import { Scale } from "@/src/utils/scaling";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const Explanation: React.FC<{
  text?: string;
  onPress?: () => void;
}> = ({ text, onPress }) => {
  if (!text || text.length <= 3) return null;

  return (
    <View
      style={{
        columnGap: Scale.moderate(16),
        marginBottom: Scale.moderate(8),
      }}
      className="flex-row items-center justify-center"
    >
      <Text style={styles.textXSmall} className="font-Jakarta">
        {text}
      </Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.textSmall} className="font-JakartaBold">
            Add
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Explanation;
