import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useTheme } from 'react-native-paper';
const { width, height } = Dimensions.get('window');

export default function SuccessScreen({ navigation }) {
    const theme = useTheme();

    // Fallback colors in case theme is not fully loaded
    const gradientColors = theme.colors?.gradient || ['#FFFFFF', '#F8FDF9'];
    const primaryColor = theme.colors?.primary || '#0C3415';
    const textColor = theme.colors?.text || '#0C3415';
    const subtitleColor = theme.colors?.subtitle || '#666666';
    const surfaceColor = theme.colors?.surface || '#F8FDF9';
    const shadowColor = theme.colors?.shadow || '#0C3415';
    const isDark = theme.dark || false;

    const handleFindFoods = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <LinearGradient
            colors={
                [ '#91D991','#FFFFFF']
            }
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <StatusBar 
                backgroundColor="transparent" 
                translucent 
            />
            {/* Main Content Area */}
            <View style={styles.contentArea}>
                {/* Title */}
                <Text style={[styles.title, { 
                    color: '#0C3415',
                    fontFamily: theme.fonts?.titleLarge?.fontFamily || 'Poppins_700Bold'
                }]}>
                    Yeay! Completed
                </Text>
                
                {/* Subtext */}
                <Text style={[styles.subtitle, { 
                    color: '#0C3415',
                    fontFamily: theme.fonts?.bodyMedium?.fontFamily || 'Poppins_400Regular'
                }]}>
                    Now you are able to order some foods as a self-reward
                </Text>

                {/* Find Foods Button */}
                <TouchableOpacity 
                    style={[styles.button, { 
                        backgroundColor: '#0C3415',
                        shadowColor: '#0C3415',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 6,
                    }]} 
                    onPress={handleFindFoods}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.buttonText, {
                        fontFamily: theme.fonts?.titleMedium?.fontFamily || 'Poppins_600SemiBold'
                    }]}>
                        Find Foods
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Food Image Section */}
            <View style={styles.foodImageContainer}>
                <Image 
                    source={require('../assets/images/food-platter.png')} 
                    style={styles.foodImage}
                    resizeMode="cover"
                    />
                {/* 
                To add the actual food platter image:
                1. Add food-platter.jpg to assets/images/
                2. Replace the source above with: require('../assets/images/food-platter.jpg')
                */}
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentArea: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: StatusBar.currentHeight || 50,
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
        lineHeight: 44,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 40,
        minWidth: 200,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
    },
    foodImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    foodImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
});
