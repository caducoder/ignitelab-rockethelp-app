import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from "native-base";
import { ChatTeardropText, SignOut, IdentificationBadge } from "phosphor-react-native";
import Filter from '../components/Filter'
import Order, { OrderProps } from '../components/Order';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import { dateFormatter } from '../utils/firestoreDateFormat';

import Logo from '../assets/logo_secondary.svg';
import Loading from '../components/Loading';

function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    // passando o id do item selecionado para a tela de detalhes
    navigation.navigate('details', { orderId })
  }

  function handleOpenProfile() {
    navigation.navigate('profile')
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(err => {
        console.log(err)
        return Alert.alert('Sair', 'Não foi possível sair.')
      });
  }

  useEffect(() => {
    setLoading(true)

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data()

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormatter(created_at)
          }
        })

        setOrders(data)
        setLoading(false)
      })

    // limpeza
    return subscriber
  }, [statusSelected])

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <HStack
          alignItems='center'
        >
          <IconButton 
            icon={<IdentificationBadge size={26} color={colors.gray[300]}/>}
            onPress={handleOpenProfile}
          />
          <IconButton
            icon={<SignOut size={26} color={colors.gray[300]} />}
            onPress={handleLogout}
          />
        </HStack>

      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w='full'
          mt={8}
          mb={4}
          justifyContent='space-between'
          alignItems='center'
        >
          <Heading color='gray.100'>
            Solicitações
          </Heading>
          <Text color='gray.200'>
            {orders.length}
          </Text>
        </HStack>

        <HStack
          space='3'
          mb={8}
        >
          <Filter
            type="open"
            title='Em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="closed"
            title='Finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {loading
          ? <Loading />
          : <FlatList
            // array q será iterado
            data={orders}
            //identificador único
            keyExtractor={item => item.id}
            // oq eu vou renderizar
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            // caso a lista estiver vazia, qual componente renderizar
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                  Você ainda não possui {'\n'} solicitações
                  {statusSelected === 'open' ? ' em andamento' : ' finalizadas'}
                </Text>
              </Center>
            )}
          />
        }
        <Button onPress={handleNewOrder}>Nova Solicitação</Button>
      </VStack>

    </VStack>
  );
}

export default Home;