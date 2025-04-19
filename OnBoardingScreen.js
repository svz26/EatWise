import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const pages = [
    {
      title: 'Scan Products',
      description: 'Quickly scan barcodes to get detailed nutritional information about products.',
      icon: 'barcode-outline',
    },
    {
      title: 'Compare Products',
      description: 'Compare nutritional values between different products to make better choices.',
      icon: 'git-compare-outline',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get recommendations based on your preferences and dietary needs.',
      icon: 'nutrition-outline',
    },
  ];
  
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Navigate to the permissions screen
      navigation.navigate('Permissions');
    }
  };
  
  const handleSkip = () => {
    navigation.navigate('Permissions');
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={pages[currentPage].icon} 
            size={100} 
            color="#4CAF50" 
          />
        </View>
        
        <Text style={styles.title}>{pages[currentPage].title}</Text>
        <Text style={styles.description}>{pages[currentPage].description}</Text>
      </View>
      
      <View style={styles.pagination}>
        {pages.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive
            ]} 
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentPage === pages.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  skipButtonText: {
    color: '#888',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    
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
  restrictionsList: {
    marginBottom: 8,
  },
  restrictionItem: {
    marginBottom: 4,
  },
  preservativesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  environmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  goodsList: {
    marginBottom: 8,
  },
  goodsItem: {
    marginBottom: 4,
  },
  nutrientsList: {
    marginBottom: 8,
  },
  nutrientItem: {
    marginBottom: 4,
  },
  feedbacksList: {
    marginBottom: 8,
  },
  feedbackItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  feedbackContent: {
    height: 80,
    backgroundColor: '#f0f0f0',
  }
});

export default OnboardingScreen;