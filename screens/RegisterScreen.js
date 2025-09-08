import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
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

    const handleSubmit = () => {
        if (!username.trim()) {
            alert('Please enter a username');
            return;
        }
        if (!/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OtpVerification', { mobile, mode: 'register', username });
        }, 600);
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
                        Create Account
                    </Text>
                    <View style={[styles.titleUnderline, { 
                        backgroundColor: primaryColor 
                    }]} />
                </View>
                
                <Text style={[styles.subtitle, { 
                    color: subtitleColor,
                    fontFamily: theme.fonts?.labelLarge?.fontFamily || 'Poppins_500Medium'
                }]}>
                    Join MomsKitchen family
                </Text>

                {/* Form Container */}
                <View style={[styles.formContainer, {
                    backgroundColor: surfaceColor + '80',
                    shadowColor: shadowColor,
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 25,
                    elevation: 8,
                }]}>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        theme={{
                            colors: {
                                primary: primaryColor,
                                background: 'transparent',
                            }
                        }}
                    />
                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="number-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={setMobile}
                        style={styles.input}
                        theme={{
                            colors: {
                                primary: primaryColor,
                                background: 'transparent',
                            }
                        }}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity 
                    style={[styles.button, { 
                        backgroundColor: primaryColor,
                        shadowColor: shadowColor,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.2,
                        shadowRadius: 15,
                        elevation: 8,
                    }]} 
                    onPress={handleSubmit}
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
                            {loading ? 'Creating...' : 'Create Account'}
                        </Text>
                        <Text style={styles.buttonArrow}>→</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity 
                    style={styles.linkContainer}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={[styles.linkText, { 
                        color: subtitleColor,
                        fontFamily: theme.fonts?.bodyMedium?.fontFamily || 'Poppins_400Regular'
                    }]}>
                        Already have an account? 
                        <Text style={{ color: primaryColor, fontWeight: '600' }}> Login here</Text>
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
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent',
        borderBottomWidth : 1,
        borderBottomColor : '#0C3415',
        color : '#0C3415',
        margin: 5,
        padding: 2,
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