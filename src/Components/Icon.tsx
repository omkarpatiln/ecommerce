import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { colors, sizes } from '../theme/themStyles';

export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

interface IconProps {
  name: string;
  type: IconType;
  color?: string;
  size?: number;
  onPress?: () => void;
  disable?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const IconComponent = ({
  name,
  type,
  color,
  size,
}: {
  name: string;
  type: IconType;
  color: string;
  size: number;
}) => {
  switch (type) {
    case 'AntDesign':
      return <AntDesignIcon name={name} size={size} color={color} />;
    case 'Entypo':
      return <EntypoIcon name={name} size={size} color={color} />;
    case 'EvilIcons':
      return <EvilIconsIcon name={name} size={size} color={color} />;
    case 'Feather':
      return <FeatherIcon name={name} size={size} color={color} />;
    case 'FontAwesome':
      return <FontAwesomeIcon name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5Icon name={name} size={size} color={color} />;
    case 'Fontisto':
      return <FontistoIcon name={name} size={size} color={color} />;
    case 'Foundation':
      return <FoundationIcon name={name} size={size} color={color} />;
    case 'Ionicons':
      return <IoniconsIcon name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIconsIcon name={name} size={size} color={color} />
      );
    case 'MaterialIcons':
      return <MaterialIconsIcon name={name} size={size} color={color} />;
    case 'Octicons':
      return <OcticonsIcon name={name} size={size} color={color} />;
    case 'SimpleLineIcons':
      return <SimpleLineIconsIcon name={name} size={size} color={color} />;
    case 'Zocial':
      return <ZocialIcon name={name} size={size} color={color} />;
    default:
      return null;
  }
};

const Icon: React.FC<IconProps> = ({
  style,
  name,
  type,
  color = colors.primary,
  size = sizes.iconM,
  onPress,
  disable,
  loading,
}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        hitSlop={{
          bottom: sizes.paddingS,
          left: sizes.paddingS,
          right: sizes.paddingS,
          top: sizes.paddingS,
        }}
        onPress={onPress}
        activeOpacity={0.7}
        style={style}
        disabled={disable || loading}
      >
        {loading ? (
          <ActivityIndicator color={color} />
        ) : (
          <IconComponent name={name} type={type} color={color} size={size} />
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={style}>
        <IconComponent name={name} type={type} color={color} size={size} />
      </View>
    );
  }
};

export default Icon;

const styles = StyleSheet.create({});
