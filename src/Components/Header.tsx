import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Cart } from '../assets/Images';
import Icon from './Icon';
import { colors, fontWeights, sizes } from '../theme/themStyles';

interface HeaderProps {
  title: string;
  HeaderCount?: number;
  onBackPress?: () => void;
  onCartClick?: () => void;
  onLogoutPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = '',
  HeaderCount = 0,
  onBackPress,
  onCartClick,
  onLogoutPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {onBackPress ? (
        <TouchableOpacity style={styles.iconWrapper} onPress={onBackPress}>
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={sizes.iconM}
            color={colors.black}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconWrapper} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={{ flexDirection: 'row' }}>
        {onCartClick && (
          <TouchableOpacity style={styles.iconWrapper} onPress={onCartClick}>
            <Image source={Cart} style={styles.cartIcon} />

            {HeaderCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{HeaderCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {onLogoutPress && (
          <TouchableOpacity style={styles.iconWrapper} onPress={onLogoutPress}>
            <Icon
              type="MaterialIcons"
              name="logout"
              size={sizes.iconM}
              color={colors.black}
            />
          </TouchableOpacity>
        )}

        {!onCartClick && !onLogoutPress && <View style={styles.iconWrapper} />}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: sizes.Header,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.paddingM,
    elevation: 5,
    shadowColor: colors.shadow,
  },

  iconWrapper: {
    width: sizes.iconL + 10,
    height: sizes.iconL + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: sizes.fontL,
    fontWeight: fontWeights.bold,
    color: colors.black,
  },

  cartIcon: {
    width: sizes.iconM,
    height: sizes.iconM,
    tintColor: colors.black,
  },

  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.error,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    fontSize: sizes.fontXS,
    color: colors.white,
    fontWeight: fontWeights.bold,
  },
});
