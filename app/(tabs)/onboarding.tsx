import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>🔵</Text>
        <Text style={styles.title}>TrackSafe</Text>
        <Text style={styles.subtitle}>Never lose your belongings again</Text>

        <View style={styles.featureList}>
          <Text style={styles.feature}>📡  Real-time Bluetooth tracking</Text>
          <Text style={styles.feature}>⚠️  Instant out-of-range alerts</Text>
          <Text style={styles.feature}>📊  Signal strength monitoring</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  emoji: {
    fontSize: 80,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  featureList: {
    marginTop: 32,
    gap: 16,
    width: '100%',
  },
  feature: {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});