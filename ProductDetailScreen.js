import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFoodItemByBarcode } from '../services/FoodDatabaseService';

const ProductDetailScreen = ({ route, navigation }) => {
  const { barcode } = route.params;
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('cons');
  const [personalRating, setPersonalRating] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (barcode) {
      const productData = getFoodItemByBarcode(barcode);
      setProduct(productData);
    }
  }, [barcode]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={24}
          color={i <= rating ? '#FFD700' : '#ddd'}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
            <Ionicons name="share-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
            <Ionicons name="scale-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ratingBox}>
        <Text style={styles.ratingLabel}>Personalized Rating</Text>
        <View style={styles.ratingDots}>
          {[1, 2, 3].map((dot) => (
            <View
              key={dot}
              style={[
                styles.ratingDot,
                (personalRating === dot || (!personalRating && dot === 3)) && styles.ratingDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.productHeader}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "black"}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.starsContainer}>
        {renderStars(4)}
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'cons' && styles.activeTabButton]}
          onPress={() => setActiveTab('cons')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'cons' && styles.activeTabButtonText]}>Cons</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'pros' && styles.activeTabButton]}
          onPress={() => setActiveTab('pros')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'pros' && styles.activeTabButtonText]}>Pros</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'cons' ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Total Harmful Preservatives</Text>
              <View style={styles.box} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <View style={styles.ingredientsGrid}>
                {product.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <Ionicons name="information-circle-outline" size={20} color="black" />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.chart} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Allergens</Text>
              <View style={styles.allergensGrid}>
                {product.allergens.map((allergen, index) => (
                  <View key={index} style={styles.allergenItem}>
                    <Ionicons name="information-circle-outline" size={20} color="black" />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.restrictionIcon} />
              <Text style={styles.sectionTitle}>Who must Not</Text>
              <View style={styles.restrictionsList}>
                <Text style={styles.restrictionItem}>• XXXXXXXX</Text>
                <Text style={styles.restrictionItem}>• XXXXXXXX</Text>
                <Text style={styles.restrictionItem}>• XXXXXXX</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Direct Preservatives</Text>
              <View style={styles.preservativesGrid}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <View key={item} style={styles.preservativeItem}>
                    <Ionicons name="information-circle-outline" size={20} color="black" />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Environmental Concerns</Text>
              <View style={styles.environmentGrid}>
                {[1, 2, 3, 4].map((item) => (
                  <View key={item} style={styles.environmentItem}>
                    <Ionicons name="information-circle-outline" size={20} color="black" />
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Goods in it</Text>
              <View style={styles.goodsList}>
                <Text style={styles.goodsItem}>• XXXXXXXX</Text>
                <Text style={styles.goodsItem}>• XXXXXXXX</Text>
                <Text style={styles.goodsItem}>• XXXXXXX</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nutrients</Text>
              <View style={styles.nutrientsList}>
                <Text style={styles.nutrientItem}>• XXXXXXXX</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>User Feedbacks</Text>
              <View style={styles.feedbacksList}>
                {[1, 2].map((id) => (
                  <View key={id} style={styles.feedbackItem}>
                    <View style={styles.userInfo}>
                      <Ionicons name="person-circle-outline" size={24} color="black" />
                      <Text style={styles.userName}>User Name</Text>
                    </View>
                    <View style={styles.feedbackContent} />
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 40 },
  headerActions: { flexDirection: 'row' },
  headerButton: { marginLeft: 16 },
  ratingBox: { alignItems: 'center', padding: 12, backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderBottomColor: '#eee' },
  ratingLabel: { color: '#888', marginBottom: 8 },
  ratingDots: { flexDirection: 'row', justifyContent: 'center' },
  ratingDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ddd', marginHorizontal: 4 },
  ratingDotActive: { backgroundColor: '#000' },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  productName: { fontSize: 24, fontWeight: 'bold' },
  brandName: { fontSize: 16, color: '#666' },
  productActions: { flexDirection: 'row' },
  heartIcon: { marginLeft: 16 },
  starsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  starIcon: { marginHorizontal: 2 },
  tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', backgroundColor: '#f5f5f5' },
  activeTabButton: { backgroundColor: '#fff' },
  tabButtonText: { fontSize: 18, fontWeight: 'bold', color: '#888' },
  activeTabButtonText: { color: '#000' },
  contentContainer: { flex: 1, padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  box: { height: 40, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd' },
  ingredientsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  ingredientItem: {
    width: '48%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    marginRight: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: { height: 100, backgroundColor: '#f5f5f5', marginBottom: 20 },
  allergensGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  allergenItem: {
    width: '48%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    marginRight: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restrictionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restrictionsList: { marginBottom: 8 },
  restrictionItem: { marginBottom: 4 },
  preservativesGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  preservativeItem: {
    width: '31%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    marginRight: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  environmentGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  environmentItem: {
    width: '48%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    marginRight: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsList: { marginBottom: 8 },
  goodsItem: { marginBottom: 4 },
  nutrientsList: { marginBottom: 8 },
  nutrientItem: { marginBottom: 4 },
  feedbacksList: { marginBottom: 8 },
  feedbackItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  userName: { marginLeft: 8, fontWeight: 'bold' },
  feedbackContent: { height: 80, backgroundColor: '#f0f0f0' },
});

export default ProductDetailScreen;
