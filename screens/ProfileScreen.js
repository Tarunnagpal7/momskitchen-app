import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'react-native-web';
import AppHeader from '../components/AppHeader';
export default function ProfileScreen() {
    const theme = useTheme();
    const isDark = theme.dark || false;

    return (
        <LinearGradient
            colors={theme.colors.gradient}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
              <StatusBar 
                barStyle={isDark ? "light-content" : "dark-content"} 
                backgroundColor="transparent" 
                translucent 
            />

            <AppHeader  />

            <View style ={{  padding: 20}} >

            <View style={styles.header}>
                <Image source={require('../assets/images/react-logo.png')} style={styles.avatar} />
                <Text style={[styles.name, { color: theme.colors.text }]}>Jane Doe</Text>
                <Text style={[styles.email, { color: theme.colors.subtitle }]}>jane@example.com</Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                <Row label="Address" value="221B Baker Street" color={theme.colors} />
                <Row label="Phone" value="+91 99999 99999" color={theme.colors} />
                <Row label="Preferences" value="Veg, Less spicy" color={theme.colors} />
            </View>

            <TouchableOpacity style={[styles.logout, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

function Row({ label, value, color }) {
    return (
        <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: color.subtitle }]}>{label}</Text>
            <Text style={[styles.rowValue, { color: color.text }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { alignItems: 'center', marginBottom: 20 },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
    name: { fontSize: 20, fontWeight: '700' },
    email: { fontSize: 12 },
    card: { borderRadius: 16, padding: 16, gap: 12 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    rowLabel: { fontSize: 13 },
    rowValue: { fontSize: 14, fontWeight: '600' },
    logout: { marginTop: 24, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    logoutText: { color: '#fff', fontWeight: '700' },
});


