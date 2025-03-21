import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  onClose?: () => void;
  onChange?: (index: number) => void;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ children, snapPoints = ["25%", "50%"], onClose, onChange }, ref) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <BottomSheet
        ref={ref}
        index={0}
        snapPoints={memoizedSnapPoints}
        style={{
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          shadowColor: COLORS.gray300,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 0.8,
          shadowOffset: { height: 5, width: 0 },
        }}
        onChange={onChange}
        enablePanDownToClose
      >
        <BottomSheetView
          style={{ padding: Scale.moderate(8) }}
          className="flex-1"
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              right: 4,
              top: 4,
              padding: Scale.moderate(8),
              backgroundColor: COLORS.softCoral200,
              borderRadius: 360,
            }}
            className="absolute"
          >
            <Icon name="close-outline" size={20} color="#555" />
          </TouchableOpacity>

          <View style={{ marginTop: Scale.moderate(32) }}>{children}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

CustomBottomSheet.displayName = "CustomBottomSheet";
export default CustomBottomSheet;
