import { NavigationContainer } from "@react-navigation/native";

import SignIn from "../screens/SignIn";
import AppRoutes from "./app.routes";

function Routes() {
  return ( 
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
   );
}

export default Routes;