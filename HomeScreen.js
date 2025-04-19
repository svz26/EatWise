import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchFoodItems, getCategories, getEssentials } from '../services/FoodDatabaseService';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [essentials, setEssentials] = useState([]);

  useEffect(() => {
    // Load categories and essential items
    setCategories(getCategories());
    setEssentials(getEssentials());
  }, []);

  const handleSearch = () => {
    // Handle search functionality
    const results = searchFoodItems(searchQuery);
    console.log(results);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryProducts', { category: item })}
    >
      <View style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderEssentialItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.essentialItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.essentialImage} />
      <Text style={styles.essentialName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter the product/item name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Better Essentials</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>More →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={essentials}
            renderItem={renderEssentialItem}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.essentialsList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>More →</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            style={styles.categoriesList}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 40,
  },
  profileButton: {
    padding: 8,
  },
  helpButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    color: '#4CAF50',
  },
  essentialsList: {
    paddingLeft: 16,
  },
  essentialItem: {
    width: 80,
    marginRight: 12,
    alignItems: 'center',
  },
  essentialImage: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  essentialName: {
    fontSize: 12,
    textAlign: 'center',
  },
  categoriesList: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    height: 180,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 40,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
