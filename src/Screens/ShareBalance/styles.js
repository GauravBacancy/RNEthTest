import {StyleSheet} from 'react-native';
import {centerText, hp, wp} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: hp(5),
    borderColor: 'black',
    borderRadius: 7,
    borderWidth: 1,
    width: wp(80),
    paddingHorizontal: wp(4),
  },
  transferBtn: {
    marginTop: hp(10),
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.8),
    borderRadius: 7,
    backgroundColor: 'black',
    ...centerText,
  },
});
