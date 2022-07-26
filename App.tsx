import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';
import Loading from './src/components/Loading';
import Routes from './src/routes';

import { THEME } from './src/styles/theme';

export default function App() {
  //carregamento de fonts, é assincrono
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {/* por ser assincrono, devemos verificar se já carregou */}
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}

