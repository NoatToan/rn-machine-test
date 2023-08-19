import {scale} from '@utils/mixins';
import {StyleSheet} from 'react-native';

const ViewStyles = StyleSheet.create({
  viewLayout: {
    marginVertical: scale(10),
    marginHorizontal: scale(10),
  },
});
const SpaceStyles = StyleSheet.create({
  s5: {width: scale(5), height: scale(5)},
  s10: {width: scale(10), height: scale(10)},
  s25: {width: scale(25), height: scale(25)},
  w10: {width: scale(10)},
  h10: {width: scale(10)},
  dividerVertical: {
    marginVertical: scale(10),
  },
});

const FontSizeStyles = StyleSheet.create({
  size10: {fontSize: scale(10)},
  size12: {fontSize: scale(12)},
  size16: {fontSize: scale(16)},
});

const FontStyles = StyleSheet.create({
  defaultText: {
    fontSize: FontSizeStyles.size10.fontSize,
  },
});
const IconStyles = StyleSheet.create({
  icon15: {
    width: scale(15),
    height: scale(15),
  },
  icon35: {
    width: scale(35),
    height: scale(35),
  },
});

const CommonStyles = {
  view: ViewStyles,
  space: SpaceStyles,
  font: FontStyles,
  fontSize: FontSizeStyles,
  icon: IconStyles,
};

export default CommonStyles;
