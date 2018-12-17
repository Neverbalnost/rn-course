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
        marginVertical: 50,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text: {
        fontSize: 30
    }
});
