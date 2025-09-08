import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function AppHeader({ 
    title = 'MomsKitchen', 
    subtitle = 'Delivering happiness',
    onBellPress, 
    onCartPress,
    notificationCount = 0,
    cartCount = 0
}) {
    const theme = useTheme();
    
    return (
        <LinearGradient
            colors={theme.colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {/* Status bar overlay for iOS */}
            <View style={styles.statusBarOverlay} />
            
            <View style={styles.headerContent}>
                {/* Left side - Logo/Title section */}
                <View style={styles.leftSection}>
                    <View style={styles.logoContainer}>
                        <MaterialCommunityIcons 
                            name="chef-hat" 
                            size={28} 
                            color={theme.colors.text} 
                            style={styles.logoIcon}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, { color: theme.colors.text }]}>
                                {title}
                            </Text>
                            <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                                {subtitle}
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* Right side - Action buttons */}
                <View style={styles.rightSection}>
                    {/* Notification Bell */}
                    <TouchableOpacity 
                        onPress={onBellPress} 
                        style={[styles.iconButton, { backgroundColor: theme.colors.surface + '20' }]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons 
                            name="bell-outline" 
                            size={20} 
                            color={theme.colors.text} 
                        />
                        {notificationCount > 0 && (
                            <View style={[styles.badge, { backgroundColor: '#FF6B6B' }]}>
                                <Text style={styles.badgeText}>
                                    {notificationCount > 9 ? '9+' : notificationCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    {/* Cart Button */}
                    <TouchableOpacity 
                        onPress={onCartPress} 
                        style={[styles.iconButton, { backgroundColor: theme.colors.surface + '20' }]}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons 
                            name="cart-outline" 
                            size={20} 
                            color={theme.colors.text} 
                        />
                        {cartCount > 0 && (
                            <View style={[styles.badge, { backgroundColor: '#4CAF50' }]}>
                                <Text style={styles.badgeText}>
                                    {cartCount > 9 ? '9+' : cartCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Bottom accent line */}
            <View style={[styles.bottomAccent, { backgroundColor: theme.colors.text + '10' }]} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 8,
        // elevation: 5,
    },
    statusBarOverlay: {
        height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60,
    },
    leftSection: {
        flex: 1,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 0.3,
        lineHeight: 28,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '400',
        opacity: 0.8,
        marginTop: 2,
        letterSpacing: 0.5,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: -2,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    bottomAccent: {
        height: 1,
        marginHorizontal: 20,
        opacity: 0.3,
    },
});