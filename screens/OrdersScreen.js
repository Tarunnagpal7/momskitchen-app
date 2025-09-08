import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'react-native-web';
import AppHeader from '../components/AppHeader';
const MOCK_ORDERS = [
    { id: '1', title: 'Kenny Kitchen', status: 'Delivered', price: '₹250', date: 'Today, 12:40 PM' },
    { id: '2', title: "G's Kitchen", status: 'On the way', price: '₹180', date: 'Today, 11:05 AM' },
    { id: '3', title: 'Eni Homes', status: 'Cancelled', price: '₹120', date: 'Yesterday, 7:45 PM' },
];

export default function OrdersScreen() {
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
            <AppHeader title="MomsKitchen" />
            <Text style={[styles.title, { color: theme.colors.text, paddingTop: 20 }]}>Orders</Text>
            <FlatList
                data={MOCK_ORDERS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                        <View style={styles.rowBetween}>
                            <Text style={[styles.subText, { color: theme.colors.subtitle }]}>{item.date}</Text>
                            <Text style={[styles.price, { color: theme.colors.primary }]}>{item.price}</Text>
                        </View>
                        <Text style={[styles.status, { color: item.status === 'Cancelled' ? '#E53935' : theme.colors.accent }]}>
                            {item.status}
                        </Text>
                    </View>
                )}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1},
    title: { fontSize: 28, fontWeight: '700', paddingHorizontal: 20, marginBottom: 16 },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 3,
    },
    cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    subText: { fontSize: 12 },
    price: { fontSize: 14, fontWeight: '700' },
    status: { marginTop: 10, fontWeight: '600' },
});


