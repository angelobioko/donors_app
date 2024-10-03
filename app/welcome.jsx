import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Buttons from '../components/Buttons'
import { useRouter } from 'expo-router'
import ImageScreenWrapper from '../components/ImageScreenWrapper'

const Welcome = () => {
    const router = useRouter();
  return (
    <ImageScreenWrapper bgImage={require('../assets/images/vinnie_welcome.jpg')}>
      <StatusBar style='dark' />
      
      <View style={styles.containers}>

        {/* welcome image */}
        {/* <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} /> */}

        {/* title */}
        <View style={{gap:20, marginTop: hp(45)}}>
            <Text style={styles.title}>Vincent</Text>
            <Text style={styles.title}>Georgette</Text>
            <Text style={styles.punchline}>The love tale of Vincent Nii Addo and Georgette Surname</Text>
        </View>

        {/* footer */}
        <View style={styles.footer}>
            <Buttons 
             title="Let's donate"
             buttonStyle={{marginHorizontal : wp(3)}}
             onPress={()=>router.push('login')}
            />

            <View style={styles.bottonTextContianer}>
                <Text style={styles.loginText}>
                    Need an account?
                </Text>
                <Pressable onPress={()=>router.push('signUp')}>
                    <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold, } ]}>
                        Sign Up
                    </Text>
                </Pressable>
            </View>
        </View>

        {/* </ImageBackground> */}

      </View>
    </ImageScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },

    welcomeImage: {
       // height: hp(30),
       // width: wp(80),
        alignSelf: 'center',
    },

    title: {
        color: theme.colors.whiteText,
        fontSize: hp(8),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },

    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        marginBottom: hp(3),
        color: theme.colors.whiteText
    },

    footer: {
        gap: 30,
        width: '100%'
    },
    bottonTextContianer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },

    loginText:{
        textAlign: 'center',
        color: theme.colors.whiteText,
        fontSize: hp(1.6)
    }
})