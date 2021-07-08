import {StyleSheet} from 'react-native';
import {centerText, hp, normalize} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...centerText,
  },
  balText: {
    marginTop: hp(10),
    fontSize: normalize(18),
  },
});
