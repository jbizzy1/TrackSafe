import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [connected, setConnected] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>TrackSafe</Text>
      <Text style={styles.subtitle}>Bluetooth Item Tracker</Text>

      <View style={[styles.statusBox, connected ? styles.connected : styles.disconnected]}>
        <Text style={styles.statusIcon}>{connected ? '🔵' : '⚫'}</Text>
        <Text style={styles.statusText}>
          {connected ? 'Connected to Tracker' : 'No Device Found'}
        </Text>
        <Text style={styles.deviceName}>
          {connected ? 'TrackSafe-001' : 'Searching...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, scanning && styles.buttonDisabled]}
        onPress={handleScan}
        disabled={scanning}
      >
        <Text style={styles.buttonText}>
          {scanning ? 'Scanning...' : connected ? 'Disconnect' : 'Scan for Device'}
        </Text>
      </TouchableOpacity>

      {connected && (
        <Text style={styles.hint}>Go to Signal tab to monitor distance</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: -16,
  },
  statusBox: {
    padding: 30,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
  },
  connected: {
    backgroundColor: '#0a2a0a',
    borderColor: '#4caf50',
  },
  disconnected: {
    backgroundColor: '#1a1a1a',
    borderColor: '#444',
  },
  statusIcon: {
    fontSize: 36,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  deviceName: {
    color: '#888',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#1a4a7a',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hint: {
    color: '#4caf50',
    fontSize: 14,
  },
});