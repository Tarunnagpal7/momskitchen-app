import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    TextInput as RNTextInput,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function OtpVerificationScreen({ navigation, route }) {
    const theme = useTheme();
    const { mobile } = route.params || {};
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [loading, setLoading] = useState(false);

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

    const setDigit = (index, value) => {
        const onlyNum = value.replace(/[^0-9]/g, '');
        const next = [...digits];
        next[index] = onlyNum.slice(-1);
        setDigits(next);
        if (onlyNum && index < 5) {
            inputs[index + 1].current?.focus();
        }
    };

    const handleVerify = () => {
        const code = digits.join('');
        if (!/^\d{6}$/.test(code)) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Success');
        }, 800);
    };

    const resendOTP = () => {
        alert('OTP resent to your mobile number');
    };

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
                
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { 
                        color: textColor,
                        fontFamily: theme.fonts?.titleLarge?.fontFamily || 'Poppins_700Bold'
                    }]}>
                        Verify OTP
                    </Text>
                    <View style={[styles.titleUnderline, { 
                        backgroundColor: primaryColor 
                    }]} />
                </View>
                
                <Text style={[styles.subtitle, { 
                    color: subtitleColor,
                    fontFamily: theme.fonts?.labelLarge?.fontFamily || 'Poppins_500Medium'
                }]}>
                    Enter the 6-digit code sent to
                </Text>
                
                <Text style={[styles.mobileNumber, { 
                    color: primaryColor,
                    fontFamily: theme.fonts?.titleMedium?.fontFamily || 'Poppins_600SemiBold'
                }]}>
                    +91 {mobile || 'your number'}
                </Text>

                {/* OTP Input Container */}
                <View style={[styles.otpContainer, {
                    backgroundColor: surfaceColor + '80',
                    shadowColor: shadowColor,
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 25,
                    elevation: 8,
                   
                }]}>
                    <View style={styles.otpRow}>
                        {digits.map((d, i) => (
                            <RNTextInput
                                ref={inputs[i]}
                                key={i}
                                style={[styles.otpBox, { 
                                    borderColor: primaryColor, 
                                    color: textColor,
                                    backgroundColor: surfaceColor
                                }]}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={d}
                                onChangeText={(v) => setDigit(i, v)}
                                returnKeyType={i === 5 ? 'done' : 'next'}
                                selectTextOnFocus                            
                                textContentType="oneTimeCode" // For iOS auto-fill
                                autoComplete="sms-otp" // For Android auto-fill
                            />
                        ))}
                    </View>
                </View>

                {/* Resend OTP */}
                <TouchableOpacity 
                    style={styles.resendContainer}
                    onPress={resendOTP}
                >
                    <Text style={[styles.resendText, { 
                        color: subtitleColor,
                        fontFamily: theme.fonts?.bodyMedium?.fontFamily || 'Poppins_400Regular'
                    }]}>
                        Didn't receive the code? 
                        <Text style={{ color: primaryColor, fontWeight: '600' }}> Resend OTP</Text>
                    </Text>
                </TouchableOpacity>

                {/* Verify Button */}
                <TouchableOpacity 
                    style={[styles.button, { 
                        backgroundColor: primaryColor,
                        shadowColor: shadowColor,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.2,
                        shadowRadius: 15,
                        elevation: 8,
                    }]} 
                    onPress={handleVerify}
                    activeOpacity={0.8}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={isDark ? 
                            [primaryColor, theme.colors?.secondary || '#4CAF50'] : 
                            [primaryColor, accentColor]
                        }
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={[styles.buttonText, {
                            fontFamily: theme.fonts?.titleMedium?.fontFamily || 'Poppins_600SemiBold'
                        }]}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </Text>
                        <Text style={styles.buttonArrow}>→</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Back to Login */}
                <TouchableOpacity 
                    style={styles.linkContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.linkText, { 
                        color: subtitleColor,
                        fontFamily: theme.fonts?.bodyMedium?.fontFamily || 'Poppins_400Regular'
                    }]}>
                        Wrong number? 
                        <Text style={{ color: primaryColor, fontWeight: '600' }}> Go back</Text>
                    </Text>
                </TouchableOpacity>
                
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
        fontSize: 32,
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
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    mobileNumber: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    otpContainer: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        marginTop: 10,
    },
    otpBox: {
        width: 45,
        height: 55,
        borderWidth: 2,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    resendContainer: {
        marginBottom: 20,
    },
    resendText: {
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        borderRadius: 25,
        marginBottom: 20,
        overflow: 'hidden',
        width: '75%',
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
    linkContainer: {
        marginBottom: 20,
    },
    linkText: {
        fontSize: 14,
        textAlign: 'center',
    },
});