import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Details from "../screens/Details";
import Register from "../screens/Register";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return ( 
    // headerShown: indica se quer a barra padrão com o nome da tela
    <Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
      <Screen name='home' component={Home}/>
      <Screen name='new' component={Register}/>
      <Screen name='details' component={Details}/>
      <Screen name='profile' component={Profile}/>
    </Navigator>
   );
}

export default AppRoutes;
