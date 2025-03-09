import { icons } from "$root/constants/assets";
import { COLORS } from "@/utils/colors";
import { Scale } from "@/utils/scaling";
import { useState } from "react";
import {
  Image,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { BaseInputProps } from "./types";

const Field: React.FC<BaseInputProps & TextInputProps> = ({
  secureTextEntry = false,
  styling,
  icon,
  placeholder,
  iconRight,
  error,
  onBlur,
  multiline,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(secureTextEntry);
  const [height, setHeight] = useState(Scale.moderate(50));

  return (
    <View
      className={`flex flex-row justify-start items-center relative`}
      style={[
        styles.container,
        {
          borderColor: isFocused
            ? COLORS.blue600
            : error && error.length
            ? COLORS.softCoral900
            : "transparent",
          borderWidth: isFocused ? 1 : 0.3,
        },
        {
          borderRadius: 16,
        },
      ]}
    >
      {icon && (
        <Image
          source={icon}
          style={[styles.iconStyle, { marginLeft: Scale.moderate(16) }]}
        />
      )}
      <TextInput
        className="items-center justify-center font-Jakarta flex-1 text-left"
        style={[
          {
            fontSize: Scale.font(isFocused ? 18 : 16),
            lineHeight: Scale.lineHeight(isFocused ? 16 : 14),
            textAlignVertical: "center",
          },
          styles.textField,
          styling,
        ]}
        multiline={multiline}
        onContentSizeChange={(event: any) =>
          setHeight(event.nativeEvent.contentSize.height)
        }
        placeholderTextColor={COLORS.gray200}
        secureTextEntry={isHidden}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        placeholder={placeholder}
        {...props}
      />
      {iconRight && (
        <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
          <Image
            source={isHidden ? icons.eyecross : icons.eye}
            style={[styles.iconStyle, { marginRight: Scale.moderate(16) }]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Field;
