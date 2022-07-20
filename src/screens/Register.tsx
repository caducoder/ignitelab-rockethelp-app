import { Text, VStack } from "native-base";
import { useState } from 'react'
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'

import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";

function Register() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  
  function handleNewOrder() {
    if(!patrimony || !description) {
      return Alert.alert('Registrar', 'Por favor, preencha todos os campos.')
    }

    setIsLoading(true)

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() =>{
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        return Alert.alert('Solicitação', 'Não foi possível registrar a solicitação.')
      })
  }

  return ( 
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title="Nova Solicitação"/>

      <Input 
        placeholder="Número do patrimônio"
        mt={5}
        onChangeText={setPatrimony}
      />

      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />
      <Button 
        mt={5} 
        onPress={handleNewOrder}
        isLoading={isLoading}
      >Cadastrar</Button>
    </VStack>
   );
}

export default Register;