import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const MENU_WIDTH = 205;
const MENU_PADDING = 8;
const ITEM_HEIGHT = 48;

interface MenuItem {
  name: string;
  onPress: () => void;
  destructive?: boolean;
  notDisplay?: boolean;
}

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  items: MenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  onClose,
  position,
  items,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const menuHeight = (items?.length || 0) * ITEM_HEIGHT + MENU_PADDING * 2;

  const adjustedPosition = {
    x: Math.max(
      MENU_PADDING,
      Math.min(position.x, screenWidth - MENU_WIDTH - MENU_PADDING),
    ),
    y: Math.max(
      MENU_PADDING,
      Math.min(position.y, screenHeight - menuHeight - MENU_PADDING),
    ),
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
            left: adjustedPosition.x,
            top: adjustedPosition.y,
          },
        ]}
      >
        {items
          ?.filter((item) => !item.notDisplay)
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                item.onPress();
                handleClose();
              }}
            >
              <Text
                style={[
                  styles.menuText,
                  item.destructive && styles.destructiveText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    width: MENU_WIDTH,
    backgroundColor: "white",
    borderRadius: 8,
    padding: MENU_PADDING,
    elevation: 5,
    shadowColor: "#999999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 200,
  },
  menuItem: {
    height: ITEM_HEIGHT,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "JakartaRegular",
  },
  destructiveText: {
    color: "#FF3B30",
  },
});

export default ContextMenu;
