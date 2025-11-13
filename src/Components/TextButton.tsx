import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import {
  colors as Colors,
  sizes as Sizes,
  textStyles as Fonts,
} from '../theme/themStyles';

interface TEXT_BUTTON {
  label: string;
  onPress: () => void;
  loading: boolean;
  disable?: boolean;
  colors?: string[];
  leftChild?: any;
  rightChild?: any;
  style?: ViewStyle;
  linearGradientSytle?: ViewStyle;
  textStyle?: TextStyle;
  isBorder?: boolean;
}
const TextButton = ({
  label,
  onPress,
  loading,
  disable,
  leftChild,
  rightChild,
  colors,
  style,
  textStyle,
  isBorder,
  linearGradientSytle,
}: TEXT_BUTTON) => {
  const colorCode = disable
    ? ['#808080', '#999999']
    : colors
    ? colors
    : [Colors.primary2, Colors.primary];
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: Sizes.Field,
        borderRadius: Sizes.Radius,
        ...style,
      }}
      onPress={() => onPress()}
      activeOpacity={0.7}
      disabled={disable || loading}
      hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colorCode}
        style={{
          flex: 1,
          borderRadius: Sizes.Radius,
          ...linearGradientSytle,
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 1,
            backgroundColor: isBorder ? Colors.white : 'transparent',
            borderRadius: Sizes.Radius - 1,
            paddingHorizontal: Sizes.Radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {leftChild ? leftChild : null}
          <Text
            style={{
              ...Fonts.Bold2,
              flex: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: isBorder ? colorCode[0] : Colors.white,
              ...textStyle,
            }}
            numberOfLines={1}
            selectable={false}
          >
            {label}
          </Text>
          {loading ? (
            <ActivityIndicator
              color={isBorder ? colorCode[0] : Colors.white}
              style={{
                position: 'absolute',
                right: 10,
              }}
            />
          ) : null}
          {rightChild ? rightChild : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({});
