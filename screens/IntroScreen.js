import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function IntroScreen({ navigation }) {

    useEffect(() => { const timer = setTimeout(() => { navigation.replace("Login"); }, 3000); return () => clearTimeout(timer); }, []);
    const theme = useTheme();

    // Fallback colors in case theme is not fully loaded
    const gradientColors = theme.colors?.gradient || ['#FFFFFF', '#F8FDF9'];
    const primaryColor = theme.colors?.primary || '#0C3415';
    const textColor = theme.colors?.text || '#0C3415';
    const subtitleColor = theme.colors?.subtitle || '#666666';
    const surfaceColor = theme.colors?.surface || '#F8FDF9';
    const shadowColor = theme.colors?.shadow || '#0C3415';
    const decorativeColor = theme.colors?.decorative || '#0C341510';
    const accentColor = theme.colors?.accent || '#81C784';
    const isDark = theme.dark || false;

    return (
        <LinearGradient
            colors={gradientColors}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        > 
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Decorative circles */}
            <View style={[styles.decorativeCircle, styles.circle1, {
                backgroundColor: decorativeColor
            }]} />
            <View style={[styles.decorativeCircle, styles.circle2, {
                backgroundColor: decorativeColor
            }]} />

            <View style={styles.content}>
                {/* Logo with shadow */}
                <View style={[styles.logoContainer, {
                    backgroundColor: surfaceColor,
                    shadowColor: shadowColor,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    elevation: 10,
                }]}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={styles.logo}
                    />
                </View>

                {/* Title with gradient text effect */}
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, {
                        color: textColor,
                        fontFamily: theme.fonts?.titleLarge?.fontFamily || 'Poppins_700Bold'
                    }]}>
                        MOMS{"\n"}KITCHEN
                    </Text>
                    <View style={[styles.titleUnderline, {
                        backgroundColor: primaryColor
                    }]} />
                </View>

                <Text style={[styles.subtitle, {
                    color: subtitleColor,
                    fontFamily: theme.fonts?.labelLarge?.fontFamily || 'Poppins_500Medium'
                }]}>
                    Home-Cooked Meals, Anytime
                </Text>


                {/* Lottie Animation with container */}
                <View style={[styles.animationContainer, {
                    //   backgroundColor: surfaceColor + '40',
                    //   shadowColor: shadowColor,
                    //   shadowOffset: { width: 0, height: 10 },
                    //   shadowOpacity: 0.1,
                    //   shadowRadius: 25,
                    //   elevation: 8,
                }]}>
                    <LottieView
                        source={require('../assets/food.json')}
                        autoPlay
                        loop
                        style={styles.animation}
                    />
                </View>



            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: StatusBar.currentHeight || 50,
    },
    decorativeCircle: {
        position: 'absolute',
        borderRadius: 200,
    },
    circle1: {
        width: 300,
        height: 300,
        top: -150,
        right: -100,
    },
    circle2: {
        width: 200,
        height: 200,
        bottom: -100,
        left: -50,
    },
    logoContainer: {
        marginBottom: 20,
        borderRadius: 50,
        padding: 15,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 40,
        letterSpacing: 1,
    },
    titleUnderline: {
        width: 60,
        height: 3,
        marginTop: 8,
        borderRadius: 2,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 20,
    },
    animationContainer: {
        marginBottom: 40,
        borderRadius: 20,
        padding: 10,
    },
    animation: {
        width: 220,
        height: 220,
    },
    button: {
        borderRadius: 25,
        marginBottom: 30,
        overflow: 'hidden',
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        marginRight: 8,
    },
    buttonArrow: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomDecorations: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});