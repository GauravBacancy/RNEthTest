import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const Details = props => {
  let {balance} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.balText}>{`Ethereum Balance: ${balance}`}</Text>
    </View>
  );
};

export default Details;
