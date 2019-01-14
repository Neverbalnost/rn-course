import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

const HEADER_MAX_HEIGHT = 300;

export default listStyles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10
    },
    link: {
        marginLeft: 'auto'
    },
    animationContainer: {
        height: 100,
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 18 : 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontFamily: "VINCHAND",
    },
    scrollViewContent: {
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
});
