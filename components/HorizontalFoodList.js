import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function HorizontalFoodList({ data }) {
    const theme = useTheme();
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            renderItem={({ item, index }) => (
                <View style={[styles.card, { backgroundColor: theme.colors.surface, marginLeft: index === 0 ? 0 : 12 }]}>
                    <Image source={item.image} style={styles.image} />
                    <View style={styles.meta}>
                        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
                        <Text style={{ color: theme.colors.subtitle }}>⭐⭐⭐⭐ {item.rating}</Text>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    card: { width: 200, borderRadius: 16, overflow: 'hidden' },
    image: { width: '100%', height: 140 },
    meta: { padding: 12 },
    title: { fontWeight: '600' },
});


