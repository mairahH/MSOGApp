import { router } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const centerX = screenWidth / 2;

const AnimatedImage = Animated.Image;

export default function LandingScreen() {
  const iconX = useSharedValue(centerX - 60);
  const iconOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.5);

  const textX = useSharedValue(centerX + 100);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    iconOpacity.value = withTiming(1, { duration: 500 });
    iconScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });

    iconX.value = withDelay(
      800,
      withTiming(centerX - 150, { duration: 400 })
    );
    textOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 500 })
    );
    textX.value = withDelay(
      1000,
      withTiming(centerX - 50, { duration: 500 })
    );

    setTimeout(() => {
      router.replace('/login');
    }, 2800);
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: '45%',
    left: iconX.value,
    transform: [{ scale: iconScale.value }],
    opacity: iconOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: '46%',
    left: textX.value,
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require('../../assets/logo-icon.png')}
        style={[styles.icon, iconStyle]}
      />
      <AnimatedImage
        source={require('../../assets/logo-text.png')}
        style={[styles.text, textStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F3F2F7',
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    width: 240,
    height: 100,
    resizeMode: 'contain',
  },
});
