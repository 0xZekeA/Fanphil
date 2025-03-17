import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import EditButton from "./EditButton";
import ErrorAndForgotPassword from "./ErrorAndForgotPass";
import Explanation from "./Explanation";
import Field from "./Field";
import { styles } from "./styles";
import { InputFieldProps } from "./types";
import UpdateModeText from "./UpdateModeText";

const InputField: React.FC<InputFieldProps> = ({
  label,
  labelStyle,
  control,
  name,
  rules,
  explanation,
  onExplanationPress,
  error,
  updateMode,
  showForgotPassword,
  onForgotPasswordPress,
  hideEditButton,
  multiline,
  ...inputProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <View style={{ width: "100%" }}>
      {!updateMode && label && (
        <Text
          style={[styles.labelText, labelStyle]}
          className={` font-JakartaMedium ${labelStyle}`}
        >
          {label}
        </Text>
      )}
      <Explanation text={explanation} onPress={onExplanationPress} />

      <View className="flex-row items-center justify-between">
        <View style={{ flexBasis: "85%", flexGrow: 1 }}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) =>
              updateMode && !isEditing ? (
                <UpdateModeText value={value} />
              ) : (
                <Field
                  {...inputProps}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error}
                  multiline={multiline}
                />
              )
            }
          />
        </View>
        {updateMode && !hideEditButton && (
          <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
        )}
      </View>

      <ErrorAndForgotPassword
        error={error}
        showForgotPassword={showForgotPassword}
        onForgotPasswordPress={onForgotPasswordPress}
      />
    </View>
  );
};

export default InputField;
