import CustomButton from "@/components/customButton";
import { Scale } from "@/utils/scaling";
import { Animated } from "react-native";
import { useSalesDataProvider } from "../hooks/SalesDataProvider";
import useAnimationsHooks from "../hooks/animations.hooks";

const BackToSalesBtn = () => {
  const { isOwingFiltered, setIsOwingFiltered } = useSalesDataProvider();
  const { slideAnim, fadeAnim, isVisible } =
    useAnimationsHooks(isOwingFiltered);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={{
        paddingVertical: Scale.moderate(24),
        transform: [{ translateY: slideAnim }],
        opacity: fadeAnim,
      }}
    >
      <CustomButton
        title="Back to sales"
        onPress={() => setIsOwingFiltered(false)}
      />
    </Animated.View>
  );
};

export default BackToSalesBtn;
