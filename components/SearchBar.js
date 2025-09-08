import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function SearchBar({ value, onChangeText, placeholder = 'Search dishes, kitchens...' }) {
    const theme = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}> 
            <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.subtitle} />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.subtitle}
                style={[styles.input, { color: theme.colors.text }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12 },
    input: { marginLeft: 8, flex: 1 },
});


