import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {hp, wp} from './Helper/ResponsiveScreen';
import Details from './Screens/Details';
import ShareBalance from './Screens/ShareBalance';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers, providers} from 'ethers';
import {INFURA_PROJECT_ID, NETWORK, PRIVATE_KEY} from './Helper/Configs';

const Index = () => {
  // State Declaration //
  let [screen, setScreen] = useState(true);
  let [provider, setProvider] = useState(null);
  let [balance, setBalance] = useState('--');
  let [wallet, setWallet] = useState(null);

  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = async () => {
    // Fetching provider //
    const infuraProvider = new providers.InfuraProvider(
      NETWORK,
      INFURA_PROJECT_ID,
    );
    setProvider(infuraProvider);

    // Fetching wallet //
    let randomWallet = new ethers.Wallet(PRIVATE_KEY, infuraProvider);
    setWallet(randomWallet);

    // Querying the network //
    await infuraProvider
      .getBalance(randomWallet.address)
      .then(result => {
        console.log('result', result);
        const positiveBalance = ethers.utils.formatEther(result);
        setBalance(positiveBalance);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setScreen(true)}
            style={{
              ...styles.balanceButton,
              backgroundColor: screen ? 'black' : '#f5f5f5',
            }}>
            <Text
              style={{
                color: screen ? 'white' : 'black',
              }}>
              Balance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setScreen(false)}
            style={{
              ...styles.sBalanceButton,
              backgroundColor: !screen ? 'black' : '#f5f5f5',
            }}>
            <Text
              style={{
                color: !screen ? '#f5f5f5' : 'black',
                textAlign: 'center',
              }}>
              {'Send\nBalance'}
            </Text>
          </TouchableOpacity>
        </View>

        {screen ? (
          <Details balance={balance} />
        ) : (
          <ShareBalance provider={provider} balance={balance} wallet={wallet} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: hp(2),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(50),
  },
  balanceButton: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderWidth: 1,
  },
  sBalanceButton: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(25),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderWidth: 1,
  },
});

export default Index;
