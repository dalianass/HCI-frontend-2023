import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigation/tabs';

export default function DefaultScreen({navigation}) {

//   const Stack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
      <Tabs/>
    // </NavigationContainer>
  );
}