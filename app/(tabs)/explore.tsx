import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function SignalScreen() {
  const [rssi, setRssi] = useState(-55);
  const [simulating, setSimulating] = useState(false);
  const threshold = -80;
  const outOfRange = rssi < threshold;

  const getSignalColor = () => {
    if (rssi > -60) return '#4caf50';
    if (rssi > -75) return '#ff9800';
    return '#f44336';
  };

  const getSignalLabel = () => {
    if (rssi > -60) return 'Strong';
    if (rssi > -75) return 'Medium';
    return 'Weak';
  };

  const getSignalBars = () => {
    if (rssi > -60) return '▂▄▆█';
    if (rssi > -75) return '▂▄▆░';
    return '▂▄░░';
  };

  useEffect(() => {
    if (!simulating) return;

    const interval = setInterval(() => {
      setRssi(prev => {
        const next = prev - 3;
        if (next < -100) {
          setSimulating(false);
          return -55;
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [simulating]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Signal Monitor</Text>

      <View style={[styles.signalBox, { borderColor: getSignalColor() }]}>
        <Text style={[styles.bars, { color: getSignalColor() }]}>
          {getSignalBars()}
        </Text>
        <Text style={styles.rssiValue}>{rssi} dBm</Text>
        <Text style={[styles.signalLabel, { color: getSignalColor() }]}>
          {getSignalLabel()} Signal
        </Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Threshold</Text>
          <Text style={styles.infoValue}>{threshold} dBm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={[styles.infoValue, { color: outOfRange ? '#f44336' : '#4caf50' }]}>
            {outOfRange ? 'Out of Range' : 'In Range'}
          </Text>
        </View>
      </View>

      {outOfRange && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>⚠️ Device Out of Range!</Text>
          <Text style={styles.alertSubtext}>Move closer to your tracker</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, simulating && styles.buttonActive]}
        onPress={() => setSimulating(!simulating)}
      >
        <Text style={styles.buttonText}>
          {simulating ? 'Stop Simulation' : 'Simulate Moving Away'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signalBox: {
    padding: 30,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    gap: 8,
  },
  bars: {
    fontSize: 32,
    letterSpacing: 4,
  },
  rssiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  signalLabel: {
    fontSize: 20,
  },
  infoBox: {
    width: '80%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#888',
    fontSize: 16,
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  alertBox: {
    backgroundColor: '#3a1a1a',
    borderColor: '#f44336',
    borderWidth: 1,
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    gap: 6,
  },
  alertText: {
    color: '#f44336',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertSubtext: {
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
  buttonActive: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});