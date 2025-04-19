import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchFoodItems } from '../services/FoodDatabaseService';

const CompareScreen = ({ navigation }) => {
  const [compareItems, setCompareItems] = useState([null, null]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeSlot, setActiveSlot] = useState(0);

  const handleAddItem = (slot) => {
    setActiveSlot(slot);
    // In a real app, this would navigate to a search screen
    // For demo, we'll populate with dummy results
    const results = searchFoodItems('');
    setSearchResults(results.slice(0, 5));
  };

  const handleSelectItem = (item) => {
    const newCompareItems = [...compareItems];
    newCompareItems[activeSlot] = item;
    setCompareItems(newCompareItems);
    setSearchResults([]);
  };

  const renderCompareSlot = (slot) => {
    const item = compareItems[slot];
    
    if (!item) {
      return (
        <TouchableOpacity 
          style={styles.emptySlot}
          onPress={() => handleAddItem(slot)}
        >
          <Ionicons name="add-circle" size={40} color="#4CAF50" />
          <Text style={styles.addText}>Add Product</Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={styles.productSlot}>
        <View style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => {
            const newCompareItems = [...compareItems];
            newCompareItems[slot] = null;
            setCompareItems(newCompareItems);
          }}
        >
          <Ionicons name="close-circle" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderComparisonContent = () => {
    if (!compareItems[0] || !compareItems[1]) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Add two products to compare their nutritional values
          </Text>
        </View>
      );
    }
    
    return (
      <ScrollView style={styles.comparisonContent}>
        {/* Nutritional comparison */}
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Calories</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].calories || '0'} kcal</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].calories || '0'} kcal</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Protein</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].protein || '0'} g</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].protein || '0'} g</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Carbs</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].carbs || '0'} g</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].carbs || '0'} g</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Fat</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].fat || '0'} g</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].fat || '0'} g</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Sugar</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].sugar || '0'} g</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].sugar || '0'} g</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Sodium</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].sodium || '0'} mg</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].sodium || '0'} mg</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Preservatives</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[0].preservatives?.length || '0'}</Text>
            </View>
            <View style={styles.comparisonValue}>
              <Text>{compareItems[1].preservatives?.length || '0'}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>Overall Health Rating</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonValue}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons 
                    key={star}
                    name={star <= (compareItems[0].rating || 0) ? 'star' : 'star-outline'} 
                    size={16} 
                    color={star <= (compareItems[0].rating || 0) ? '#FFD700' : '#ddd'} 
                  />
                ))}
              </View>
            </View>
            <View style={styles.comparisonValue}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons 
                    key={star}
                    name={star <= (compareItems[1].rating || 0) ? 'star' : 'star-outline'} 
                    size={16} 
                    color={star <= (compareItems[1].rating || 0) ? '#FFD700' : '#ddd'} 
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Compare Products</Text>
      </View>
      
      <View style={styles.compareContainer}>
        {renderCompareSlot(0)}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        {renderCompareSlot(1)}
      </View>
      
      {searchResults.length > 0 ? (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchTitle}>Select a product:</Text>
          {searchResults.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.searchResultItem}
              onPress={() => handleSelectItem(item)}
            >
              <View style={styles.resultImage} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultBrand}>{item.brand}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        renderComparisonContent()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  compareContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptySlot: {
    flex: 1,
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    marginTop: 8,
    color: '#4CAF50',
  },
  productSlot: {
    flex: 1,
    height: 150,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productBrand: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  vsContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#888',
  },
  comparisonContent: {
    flex: 1,
    padding: 16,
  },
  comparisonSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comparisonRow: {
    flexDirection: 'row',
  },
  comparisonValue: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  searchResultsContainer: {
    flex: 1,
    padding: 16,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  resultImage: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontWeight: 'bold',
  },
  resultBrand: {
    color: '#666',
    fontSize: 12,
  },
});

export default CompareScreen;
