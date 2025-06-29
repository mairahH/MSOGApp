// app/landing.tsx
import { Image, StyleSheet, View } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9fb',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
