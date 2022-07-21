import { Heading, HStack, IconButton, StyledProps, useTheme } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from '@react-navigation/native'

type Props = StyledProps & {
  title: string
}

function Header({ title, ...rest}: Props) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return ( 
    <HStack
      w='full'
      justifyContent='space-between'
      alignItems='center'
      bg='gray.600'
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton 
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={() => navigation.goBack()}
      />

      <Heading color='gray.100' textAlign='center' fontSize='lg' flex={1} mr={38}>
        {title}
      </Heading>
    </HStack>
   );
}

export default Header;