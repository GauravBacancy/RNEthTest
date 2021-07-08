import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {hp} from '../../Helper/ResponsiveScreen';
import {validateNumbers} from '../../Helper/Validation';

const ShareBalance = props => {
  // State Declaration //
  let [address, setAddress] = useState('');
  let [value, setValue] = useState('');

  // Props //
  let {balance, wallet} = props;

  const onPress = async () => {
    let error = '';
    if (address.trim() === '' || value.trim() === '') {
      error = 'Please fill all required fields';
    } else if (!validateNumbers(value)) {
      error = 'Balance accepts digits only';
    } else if (balance < value) {
      error = 'Insufficient balance in your wallet';
    }
    if (error !== '') {
      Alert.alert('Ethereum App', error);
    } else {
      let tx = {
        to: address.trim(),
        value: value,
      };
      await wallet
        .sendTransaction(tx)
        .then(result => {
          Alert.alert('Ethereum App', 'Successfully transferred ethereum');
        })
        .catch(error => {
          Alert.alert('Ethereum App', 'Something went wrong');
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: hp(12)}}>
        <TextInput
          placeholder={'*Ethereum address'}
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        <TextInput
          placeholder={'*Balance'}
          value={value}
          onChangeText={text => setValue(text)}
          keyboardType={'numeric'}
          style={styles.input}
        />
        <TouchableOpacity onPress={onPress} style={styles.transferBtn}>
          <Text style={{color: 'white'}}>Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareBalance;
