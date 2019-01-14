import { StyleSheet } from 'react-native';

export default mapStyles = StyleSheet.create({
    container: {
      height: 400,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
})
