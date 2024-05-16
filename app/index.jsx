import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View, Image } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from '../components/CustomButton'

// import './shim';
// import crypto from 'react-native-crypto';
import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;


export default function App() {
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
                    {/* <Image
                        source={images.path}
                        className="w-[136px] h-[15px] avsolute-bottom-2 -right-8"
                        resizeMode='contain'
                    /> */}
                    <CustomButton
                        title="Get a new Wallet"
                        handlePress={() => { router.push('/sign-in') }}
                        containerStyles="w-full mt-7"
                    />
                    <CustomButton
                        title="I already have one"
                        handlePress={() => { router.push('/sign-up') }}
                        containerStyles="w-full mt-7"
                    />
                    <CustomButton
                        title="see"
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

