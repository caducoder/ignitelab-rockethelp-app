import { Button as NBButton, Heading, IButtonProps} from 'native-base';

type Props = IButtonProps & {
  children: string,
}

function Button({children, ...rest}: Props) {
  return ( 
    <NBButton 
      bg='green.700'
      h={14}
      rounded='sm'
      _pressed={{ bg: 'green.500'}}
      {...rest} //sempre a última prop
    >
      <Heading color='white' fontSize='sm'>{children}</Heading>
    </NBButton>
   );
}

export default Button;