import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MovieScreen from './screens/MovieScreen';
import BiometricScreen from './screens/BiometricScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Biometric" component={BiometricScreen} />
        <Stack.Screen name="Movies" component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
