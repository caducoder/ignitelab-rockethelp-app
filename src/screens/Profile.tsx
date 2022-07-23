import { VStack, Text, Center, useTheme, ScrollView, AlertDialog, Button as NBButton } from "native-base";
import { UserCircle } from "phosphor-react-native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Alert } from "react-native";
import Header from '../components/Header'
import Input from "../components/Input";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [nome, setNome] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const [novaSenha, setNovaSenha] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  function deleteUser() {
    user.delete()
      .then(() => {
        Alert.alert("Perfil", "Usuário deletado com sucesso.");
      })
      .catch(err => {
        Alert.alert("Perfil", err.message);
      })
  }

  async function handleSaveProfile() {

    setIsLoading(true)

    try {
      if(nome){
        await user.updateProfile({displayName: nome})
      }
  
      if(email){
        await user.updateEmail(email)
      }
  
      if(novaSenha){
        await user.updatePassword(novaSenha)
      }

      Alert.alert("Perfil", "Perfil atualizado com sucesso!")
    } catch (error) {
      console.log(error.message)

      if(error.code === 'auth/requires-recent-login'){
        return Alert.alert("Perfil", "Essa ação requer um login recente. Por favor, relogue antes de tentar denovo.");
      }

      if(error.code === 'auth/invalid-email') {
        return Alert.alert('Perfil', 'Email inválido')
      }

      if(error.code === 'auth/weak-password') {
        return Alert.alert('Perfil', 'Senha fraca')
      }

      Alert.alert("Perfil", "Não foi possível atualizar o perfil.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {

    const user = auth().currentUser

    setUser(user);
    setNome(user?.displayName);
    setEmail(user?.email);

  }, []);

  return (
    <VStack flex={1} bg='gray.600' px={5}>
      <Header title='Perfil' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={5} mb={10}>
          <Center>
            <UserCircle size={80} color={colors.gray[300]} />
          </Center>

          <VStack >
            <Text color='white' mb={2}>Nome</Text>
            <Input
              placeholder="Seu nome"
              value={nome}
              onChangeText={setNome}
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>E-mail</Text>
            <Input
              placeholder="Seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>Alterar senha</Text>
            <Input
              placeholder="Nova senha"
              onChangeText={setNovaSenha}
            />
          </VStack>

          <Button 
            mt={7} 
            onPress={handleSaveProfile}
            isLoading={isLoading}
          >
            Salvar
          </Button>

          <Button bg='red.700' _pressed={{ bg: 'red.500' }} onPress={() => setIsOpen(true)}>
            Deletar conta
          </Button>

          <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} >
              <AlertDialog.Content >

                <AlertDialog.Body bg='gray.600'>
                  <Text color='white'>
                    Isto irá remover todos os dados relacionados a sua conta. Essa ação
                    não poderá ser desfeita. Dados removidos não podem ser recuperados.
                  </Text>
                </AlertDialog.Body>
                <AlertDialog.Footer bg='gray.600'>
                  <NBButton.Group space={2}>
                    <NBButton variant="outline" colorScheme='blueGray' onPress={onClose} ref={cancelRef}>
                      Cancelar
                    </NBButton>
                    <NBButton colorScheme="danger" onPress={deleteUser}>
                      Deletar
                    </NBButton>
                  </NBButton.Group>
                </AlertDialog.Footer>

              </AlertDialog.Content>
            </AlertDialog>
          </Center>
        </VStack>
      </ScrollView >
    </VStack >
  );
}

export default Profile;