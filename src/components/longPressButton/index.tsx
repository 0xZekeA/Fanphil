import { Scale } from "@/utils/scaling";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import useAnimations from "./animation.hooks";
import CircularAnimation from "./CircularAnimation";
import styles from "./styles";

interface LongPressButtonProps {
  onLongPressComplete: () => void | Promise<void>;
  pressDuration?: number;
  className?: string;
  text: string;
  size?: number;
  closeModal: Dispatch<SetStateAction<boolean>>;
  destructive?: boolean;
}

const LongPressButton: React.FC<LongPressButtonProps> = ({
  onLongPressComplete,
  className = "",
  text,
  closeModal,
  destructive,
}) => {
  const { startAnimation, stopAnimation, isPressing, animation } =
    useAnimations();

  return (
    <View className={className} style={styles.container}>
      <CircularAnimation
        destructive={destructive}
        isPressing={isPressing}
        animation={animation}
      />
      <Pressable
        onPressIn={() => startAnimation(onLongPressComplete, closeModal)}
        onPressOut={stopAnimation}
        style={{
          paddingHorizontal: Scale.moderate(24),
          paddingVertical: Scale.moderate(8),
          backgroundColor:
            isPressing && destructive
              ? "#B91C1C"
              : isPressing
                ? "#5a9eec"
                : destructive
                  ? "#DC2626"
                  : "#4287f5",
          borderRadius: 10,
        }}
        className="justify-center items-center"
        accessibilityRole="button"
        accessibilityLabel={`Long press to ${text}`}
      >
        <Text style={styles.btnText} className="font-JakartaBold">
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default LongPressButton;
