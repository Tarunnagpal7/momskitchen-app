import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import {
    Dimensions,
    ScrollView // ✅ use native ScrollView
    ,



    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { useTheme } from 'react-native-paper';
import AddressBar from '../components/AddressBar';
import AppHeader from '../components/AppHeader';
import CategoryTabs from '../components/CategoryTabs';
import HorizontalFoodList from '../components/HorizontalFoodList';
import OffersCarousel from '../components/OffersCarousel';
import SearchBar from '../components/SearchBar';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
    const theme = useTheme();

    const gradientColors = theme.colors?.gradient || ['#FFFFFF', '#F8FDF9'];
    const isDark = theme.dark || false;

    const categories = useMemo(() => ['New Taste', 'Popular', 'Recommended'], []);
    const foodsNew = useMemo(() => ([
        { id: '1', name: 'Kenny Kitchen', rating: 4.5, price: 'INR 120.00', image: require('../assets/images/food_1.png') },
        { id: '2', name: "G's Kitchen", rating: 4.3, price: 'INR 150.00', image: require('../assets/images/food_2.png') },
        { id: '3', name: 'Eni Homes', rating: 4.1, price: 'INR 50.00', image: require('../assets/images/food_3.png') },
        { id: '4', name: 'Nana Meals', rating: 4.7, price: 'INR 200.00', image: require('../assets/images/food_4.png') },
    ]), []);
    const foodsPopular = useMemo(() => ([
        { id: '5', name: 'Home Chef A', rating: 4.8, price: 'INR 220.00', image: require('../assets/images/food_2.png') },
        { id: '6', name: 'Home Chef B', rating: 4.6, price: 'INR 180.00', image: require('../assets/images/food_4.png') },
    ]), []);
    const foodsRecommended = useMemo(() => ([
        { id: '7', name: 'Tiffin Corner', rating: 4.9, price: 'INR 250.00', image: require('../assets/images/food_1.png') },
        { id: '8', name: 'Mom Special', rating: 5.0, price: 'INR 300.00', image: require('../assets/images/food_3.png') },
    ]), []);
    const [activeTab, setActiveTab] = React.useState(0);
    const [query, setQuery] = React.useState('');

    return (
        <LinearGradient
            colors={gradientColors}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <StatusBar 
                barStyle={isDark ? "light-content" : "dark-content"} 
                backgroundColor="transparent" 
                translucent 
            />

                <AppHeader />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                    <AddressBar onChangePress={() => {}} />
                    <View style={{ height: 12 }} />
                    <SearchBar value={query} onChangeText={setQuery} />
                    <View style={{ height: 16 }} />
                    <OffersCarousel />

                    <CategoryTabs categories={categories} activeIndex={activeTab} onChange={setActiveTab} />

                    <View style={{ marginVertical: 16 }}>
                        <HorizontalFoodList
                            data={(activeTab === 0 ? foodsNew : activeTab === 1 ? foodsPopular : foodsRecommended)
                                .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))}
                        />
                    </View>

                    <View style={{ marginVertical: 16 }}>
                        <HorizontalFoodList
                            data={(activeTab === 0 ? foodsNew : activeTab === 1 ? foodsPopular : foodsRecommended)
                                .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))}
                        />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
