import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput as TextField,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {
  colors as Colors,
  sizes as Sizes,
  textStyles as Fonts,
} from '../theme/themStyles';
import React, { useRef } from 'react';
interface INPUT_INTERFACE {
  leftChild?: any;
  rightChild?: any;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  disable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  error?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  hidden?: boolean;
  imp?: boolean;
  autoFocus?: boolean;
}
const TextInput = ({
  leftChild,
  rightChild,
  value,
  placeholder,
  onChangeText,
  numberOfLines,
  disable,
  keyboardType = 'default',
  multiline = false,
  maxLength,
  style,
  textStyle,
  error,
  label,
  labelStyle,
  hidden,
  imp,
  autoFocus = true,
}: INPUT_INTERFACE) => {
  const textFieldRef = useRef<TextField | null>(null);

  return (
    <View style={{ width: '100%', margin: Sizes.Padding }}>
      {label && (
        <Text
          style={{
            ...Fonts.Medium3,
            color: Colors.primary,
            ...labelStyle,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {'' + label}
          {imp ? (
            <Text
              style={{
                ...Fonts.Regular3,
                color: '#FF0123',
                ...labelStyle,
              }}
            >
              {'*'}
            </Text>
          ) : (
            ''
          )}
        </Text>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          if (multiline) {
            textFieldRef.current?.focus();
          }
        }}
      >
        <View
          style={[
            {
              width: '100%',
              borderRadius: Sizes.Radius,
              minHeight: multiline ? Sizes.Field * 2 : 40,
              maxHeight: multiline ? Sizes.Field * 3 : 40,
              borderColor: disable
                ? Colors.disable
                : error
                ? Colors.red
                : Colors.black,
              // borderWidth: 1,
              borderWidth: 0,
              flexDirection: 'row',
              alignItems: multiline ? 'flex-start' : 'center',
              backgroundColor: Colors.white,
            },
            { ...style },
          ]}
        >
          {leftChild ? leftChild : null}

          <TextField
            ref={textFieldRef}
            focusable={true}
            autoFocus={autoFocus}
            secureTextEntry={hidden ? true : false}
            keyboardType={keyboardType}
            value={value}
            numberOfLines={numberOfLines}
            onChangeText={(text: string) => {
              onChangeText(text);
            }}
            style={[
              {
                flex: 1,
                paddingHorizontal: Sizes.Padding,
                ...Fonts.Medium2,
                alignItems: 'center',
                textAlignVertical: multiline ? 'center' : 'center',
                justifyContent: 'center',
                color: error ? Colors.red : Colors.primary,
                paddingVertical: 0,
              },
              { ...textStyle },
            ]}
            editable={!disable}
            placeholder={placeholder}
            placeholderTextColor={
              error
                ? Colors.red + '80'
                : disable
                ? Colors.disable
                : Colors.primary2
            }
            multiline={multiline}
            maxLength={maxLength}
          />

          {rightChild ? rightChild : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({});
