import { VStack, Text, HStack, Center, useTheme, ScrollView, AlertDialog, Button as NBButton } from "native-base";
import { UserCircle } from "phosphor-react-native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import Header from '../components/Header'
import Input from "../components/Input";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";

function Profile() {
  const { colors } = useTheme();
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  useEffect(() => {

    const user = auth().currentUser

    setUser(user);


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
              value={''}
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>Cargo</Text>
            <Input
              placeholder="Sua profissão"
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>Celular</Text>
            <Input
              placeholder="(00) 900000000"
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>E-mail</Text>
            <Input
              placeholder="Seu e-mail"
              value={''}
            />
          </VStack>

          <VStack >
            <Text color='white' mb={2}>Alterar senha</Text>
            <Input
              placeholder="Nova senha"

            />
          </VStack>

          <Button mt={7}>Salvar</Button>
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
                    <NBButton colorScheme="danger" onPress={onClose}>
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