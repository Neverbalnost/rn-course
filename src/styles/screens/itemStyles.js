import { StyleSheet } from 'react-native';

export default listStyles = StyleSheet.create({
    icon: {
        marginRight: 10
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    footer: {
        flexDirection: 'row'
    },
    paragraph: {
        marginVertical: 20
    },
    itemView: {
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 20,
        borderTopColor: '#eee',
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 30
    },
    moreInfo: {
        backgroundColor: '#008ACE',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    moreInfoText: {
        color: '#fff'
    },
    arrowAnim: {
        marginTop: -60,
        width: '100%'
    }
});
