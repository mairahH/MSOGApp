import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

export default function LandingScreen() {
  const iconTranslateX = useSharedValue(0);
  const iconOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.5);
  const textOpacity = useSharedValue(0);
  const textTranslateX = useSharedValue(30);

  useEffect(() => {
    iconOpacity.value = withTiming(1, { duration: 500 });
    iconScale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });

    setTimeout(() => {
      iconTranslateX.value = withTiming(-80, { duration: 500 });
      textOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
      textTranslateX.value = withDelay(300, withTiming(0, { duration: 500 }));
    }, 800);

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { translateX: iconTranslateX.value },
    ],
    opacity: iconOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateX: textTranslateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo-icon.png')}
        style={[styles.logo, iconStyle]}
      />
      <Animated.Text style={[styles.text, textStyle]}>
        MUSLIM{'\n'}SOCIETY OF GUELPH
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#74689A',
  },
});
