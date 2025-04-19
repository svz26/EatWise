import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanType, setScanType] = useState('barcode'); // 'barcode', 'qr', 'image'

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Look up product by barcode
    navigation.navigate('ProductDetail', { barcode: data });
  };

  const changeScanType = (type) => {
    setScanType(type);
    setScanned(false);
  };

  const renderScannerContent = () => {
    switch (scanType) {
      case 'barcode':
        return (
          <View style={styles.scannerContainer}>
            <Text style={styles.scannerTitle}>Barcode</Text>
            <View style={styles.scanFrame}>
              {hasPermission && !scanned && (
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
            </View>
            <TouchableOpacity 
              style={styles.manualButton}
              onPress={() => navigation.navigate('ManualEntry')}
            >
              <Text style={styles.manualButtonText}>Manual Entry</Text>
            </TouchableOpacity>
          </View>
        );
      case 'qr':
        return (
          <View style={styles.scannerContainer}>
            <Text style={styles.scannerTitle}>QR</Text>
            <View style={styles.scanFrame}>
              {hasPermission && !scanned && (
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject}
                />
              )}
            </View>
            <TouchableOpacity 
              style={styles.manualButton}
              onPress={() => navigation.navigate('ManualEntry')}
            >
              <Text style={styles.manualButtonText}>Manual Entry</Text>
            </TouchableOpacity>
          </View>
        );
      case 'image':
        return (
          <View style={styles.scannerContainer}>
            <Text style={styles.scannerTitle}>Image</Text>
            <View style={styles.scanFrame}>
              {/* Image recognition would go here */}
            </View>
            <TouchableOpacity 
              style={styles.manualButton}
              onPress={() => navigation.navigate('ManualEntry')}
            >
              <Text style={styles.manualButtonText}>Manual Entry</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.scanTypeButtons}>
          {scanType === 'barcode' ? (
            <TouchableOpacity style={styles.scanTypeButtonActive}>
              <Text>BR</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.scanTypeButton}
              onPress={() => changeScanType('barcode')}
            >
              <Text>BR</Text>
            </TouchableOpacity>
          )}
          
          {scanType === 'qr' ? (
            <TouchableOpacity style={styles.scanTypeButtonActive}>
              <Text>QR</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.scanTypeButton}
              onPress={() => changeScanType('qr')}
            >
              <Text>QR</Text>
            </TouchableOpacity>
          )}
          
          {scanType === 'image' ? (
            <TouchableOpacity style={styles.scanTypeButtonActive}>
              <Text>Img</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.scanTypeButton}
              onPress={() => changeScanType('image')}
            >
              <Text>Img</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {renderScannerContent()}

      {scanned && (
        <TouchableOpacity 
          style={styles.rescanButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
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
    alignItems: 'center',
    padding: 16,
  },
  scanTypeButtons: {
    flexDirection: 'row',
  },
  scanTypeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  scanTypeButtonActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scanFrame: {
    width: '80%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    marginBottom: 20,
  },
  manualButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  manualButtonText: {
    fontSize: 16,
  },
  rescanButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  rescanButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});

export default ScanScreen;
