import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [camera, setCamera] = useState(true);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings', 'favorites', 'history'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <View style={styles.settingsContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="person-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Personal Information</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="lock-closed-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Security</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="mail-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Email</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="notifications-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="location-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Location</Text>
                </View>
                <Switch
                  value={location}
                  onValueChange={setLocation}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                />
              </View>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="camera-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Camera</Text>
                </View>
                <Switch
                  value={camera}
                  onValueChange={setCamera}
                  trackColor={{ false: '#767577', true: '#4CAF50' }}
                />
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="help-circle-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Help Center</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>Contact Us</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="information-circle-outline" size={24} color="#4CAF50" style={styles.settingIcon} />
                  <Text style={styles.settingText}>About</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#888" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        );
      case 'favorites':
        return (
          <View style={styles.favoritesContainer}>
            <Text style={styles.emptyStateText}>No favorites yet</Text>
          </View>
        );
      case 'history':
        return (
          <View style={styles.historyContainer}>
            <Text style={styles.emptyStateText}>No scan history</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileHeader}>
        <View style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'settings' && styles.activeTabButton]} 
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'settings' && styles.activeTabButtonText]}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'favorites' && styles.activeTabButton]} 
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'favorites' && styles.activeTabButtonText]}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'history' && styles.activeTabButtonText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {renderTabContent()}
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
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#666',
    marginBottom: 12,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#4CAF50',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabButtonText: {
    color: '#888',
  },
  activeTabButtonText: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  settingsContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },
  favoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    color: '#888',
    textAlign: 'center',
  },
});

export default ProfileScreen;
