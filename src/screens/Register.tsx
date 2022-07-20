import { Text, VStack } from "native-base";
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";

function Register() {
  return ( 
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title="Nova Solicitação"/>

      <Input 
        placeholder="Número do patrimônio"
        mt={5}
      />

      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />
      <Button mt={5}>Cadastrar</Button>
    </VStack>
   );
}

export default Register;