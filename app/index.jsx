import "./polyfills";

import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View, Image } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from "react";


import { images } from '../constants'
import CustomButton from '../components/CustomButton'

import "../globals";
import "@expo/metro-runtime";
import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;


import Web3Auth from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import SolanaPrivateKeyProvider from '@web3auth/solana-provider';
// import RPC from "./solanaRPC";

const clientId = "BA4vkq_c_YC6o9F6hRkEnipqI2hk8LM5rHhTjApkCIzw3VE6hEwxbhdjLybHVLHTLa_3RZzsZpgZ5phhHx25rGk";


import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";

export default function App() {
  const [user, setUser] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: clientId,
          chainConfig: { chainNamespace: CHAIN_NAMESPACES.SOLANA },
          web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
        });
        await web3auth.initModal();
        setWeb3auth(web3auth);
      } catch (error) {
        console.error("Web3Auth Initialization Error:", error);
      }
    };
    initWeb3Auth();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    try {
      const provider = await web3auth.connect();
      setUser(provider);
      Alert.alert("Login Successful");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = async () => {
    if (!web3auth) return;
    try {
      await web3auth.logout();
      setUser(null);
      Alert.alert("Logout Successful");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
                

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{ height: '100%'}}>
                <View className='w-full justify-center items-center min-h-full px-4'>
                    <Image
                        source={images.recivonobg}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    {/* <Image
                        source={images.cards}
                        className="max-w-[380px] h-[300px]"
                        resizeMode='contain'
                    /> */}
                    <Text className="text-3xl text-white font-bold text-center">
                        Recivo
                        {/* Real reviews, Real rewards, Real simple with {''}
                        <Text className="text-blue-200">Recivo</Text> */}
                    </Text>
                    <CustomButton
                        title="login"
                        handlePress={() => { router.push('/web3auth') }}
                        containerStyles="w-full mt-7"
                    />
                    <CustomButton
                        title="homescreen"
                        handlePress={() => { router.push('/home') }}
                        containerStyles="w-full mt-7"
                    />
                </View> 
            </ScrollView>
            {/* style:light 可以設定來打開電池或是時間 */}
            <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
    );
}

