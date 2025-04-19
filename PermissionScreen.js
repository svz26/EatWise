import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PermissionsScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(false);
  
  const handleContinue = () => {
    navigation.navigate('Main');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>App Permissions</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.contentTitle}>We need a few permissions to provide you with the best experience</Text>
        
        <View style={styles.permissionsList}>
          <View style={styles.permissionItem}>
            <View style={styles.permissionLeft}>
              <View style={styles.permissionIcon}>
                <Ionicons name="camera" size={24} color="#4CAF50" />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Camera</Text>
                <Text style={styles.permissionDescription}>Needed for barcode scanning and product recognition</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.permissionButton,
                cameraPermission && styles.permissionButtonActive
              ]}
              onPress={() => setCameraPermission(!cameraPermission)}
            >
              <Text style={[
                styles.permissionButtonText,
                cameraPermission && styles.permissionButtonTextActive
              ]}>
                {cameraPermission ? 'Allowed' : 'Allow'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.permissionItem}>
            <View style={styles.permissionLeft}>
              <View style={styles.permissionIcon}>
                <Ionicons name="location" size={24} color="#4CAF50" />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Location</Text>
                <Text style={styles.permissionDescription}>For finding stores and products near you</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.permissionButton,
                locationPermission && styles.permissionButtonActive
              ]}
              onPress={() => setLocationPermission(!locationPermission)}
            >
              <Text style={[
                styles.permissionButtonText,
                locationPermission && styles.permissionButtonTextActive
              ]}>
                {locationPermission ? 'Allowed' : 'Allow'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.permissionItem}>
            <View style={styles.permissionLeft}>
              <View style={styles.permissionIcon}>
                <Ionicons name="notifications" size={24} color="#4CAF50" />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionTitle}>Notifications</Text>
                <Text style={styles.permissionDescription}>Get updates on products and features</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.permissionButton,
                notificationPermission && styles.permissionButtonActive
              ]}
              onPress={() => setNotificationPermission(!notificationPermission)}
            >
              <Text style={[
                styles.permissionButtonText,
                notificationPermission && styles.permissionButtonTextActive
              ]}>
                {notificationPermission ? 'Allowed' : 'Allow'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          You can change these permissions later in the app settings
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },
  permissionsList: {
    marginBottom: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  permissionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  permissionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#777',
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  permissionButtonActive: {
    backgroundColor: '#4CAF50',
  },
  permissionButtonText: {
    color: '#4CAF50',
  },
  permissionButtonTextActive: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerNote: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PermissionsScreen