import { StyleSheet } from 'react-native';

export default commonStyles = StyleSheet.create({
    logo: {
        backgroundColor: '#fff',
        width: '100%',
        height: 120,
        marginVertical: 15
    },
    commonView: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        color: '#008ACE',
        fontSize: 50,
        textAlign: 'center'
    },
    h2: {
        color: '#008ACE',
        fontSize: 30,
        textAlign: 'center'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 5
    },
    button: {
        backgroundColor: '#008ACE',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonRed: {
        backgroundColor: '#D35D47'
    },
    text: {
        fontFamily: "VINCHAND",
        fontSize: 20,
    },
    textGray: {
        color: "#333"
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    animationContainer: {
        height: 240
    },
    error: {
        color: '#D35D47',
        textAlign: 'center',
        paddingVertical: 5
    }
});
