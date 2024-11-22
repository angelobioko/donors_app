import React, { useEffect, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import Buttons from '../components/Buttons';
import { useRouter } from 'expo-router';
import ImageScreenWrapper from '../components/ImageScreenWrapper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Welcome = () => {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        TemptingFont: require('../assets/fonts/Tempting.ttf'),
        GreatVibesFont: require('../assets/fonts/GreatVibes-Regular.ttf')
    });

    useEffect(() => {
        const prepare = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        };
        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Avoid rendering before fonts load
    }

    return (
        <ImageScreenWrapper bgImage={require('../assets/images/joy_welcome.jpeg')}>
            <StatusBar style="dark" />

            <View style={styles.container}>
                {/* Title Section */}
                <View style={{}}>
                    <Text style={styles.groomText}>Joy <Text style={styles.ampersand}>&</Text> Abena</Text>
                    <Text style={styles.punchline}>
                        30/11/2024
                    </Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Buttons
                        title="Let's donate"
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => router.push('login')}
                    />

                    <View style={styles.bottonTextContianer}>
                        <Text style={styles.loginText}>Need an account?</Text>
                        <Pressable onPress={() => router.push('signUp')}>
                            <Text
                                style={[
                                    styles.loginText,
                                    { color: theme.colors.whiteText, fontWeight: theme.fonts.semibold },
                                ]}
                            >
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        overflow:'visible'
    },
    title: {
        color: theme.colors.whiteText,
        fontSize: hp(8),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold,
    },
    groomText: {
        color: theme.colors.textDark,
        fontSize: hp(8),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold,
        fontFamily: 'GreatVibesFont',
        lineHeight: hp(15)
    },
    ampersand: {
        color: theme.colors.whiteText,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold,
        fontFamily: 'GreatVibesFont',
        lineHeight: hp(15)
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        marginBottom: hp(3),
        color: theme.colors.whiteText,
    },
    footer: {
        gap: 30,
        width: '100%',
        marginBottom: hp(10)
    },
    bottonTextContianer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.whiteText,
        fontSize: hp(1.6),
    },
});
