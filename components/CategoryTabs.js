import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function CategoryTabs({ categories, activeIndex, onChange }) {
    const theme = useTheme();
    return (
        <View style={styles.row}>
            {categories.map((c, idx) => (
                <TouchableOpacity key={c} onPress={() => onChange(idx)}>
                    <Text style={[styles.tab, { color: idx === activeIndex ? theme.colors.text : theme.colors.subtitle, fontWeight: idx === activeIndex ? '700' : '500' }]}>
                        {c}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', marginTop: 24, alignItems: 'center' },
    tab: { marginRight: 20 },
});


