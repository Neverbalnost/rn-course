import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import commonStyles from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import listStyles from '../styles/screens/listStyles';

class List extends React.Component {
    static navigationOptions = {
        title: 'List of stuff',
    };
    render() {
        return (
            <ScrollView style={commonStyles.commonView}>
                <Text style={[commonStyles.text, commonStyles.h1]}>The stuff</Text>
                <Text style={[commonStyles.text, commonStyles.h2]}>which I need for coding</Text>
                <FlatList
                    data={[
                        {key: 'a', name: 'Energy', icon: 'rocket', text: 'Everyone needs their batteries charged to code effectively.'},
                        {key: 'b', name: 'A brave heart', icon: 'heart', text: 'Legacy code don\'t scare me! (Almost.)'},
                        {key: 'c', name: 'Black magic', icon: 'magic', text: 'Sometimes it\'s the only thing that helps.'},
                        {key: 'd', name: 'Green tea', icon: 'coffee', text: 'Delicious! And invigorating!'},
                        {key: 'e', name: 'Precaution', icon: 'fire-extinguisher', text: 'Stay safe and never commit to master.'},
                        {key: 'f', name: 'Old-school Heavy Metal', icon: 'music', text: 'Hell yeah!'},
                        {key: 'g', name: 'Proper climate', icon: 'snowflake-o', text: 'My brain doesn\'t work on temperatures higher than +22.'},
                        {key: 'h', name: 'Fun', icon: 'gamepad', text: 'If coding is not fun, then what is?'}
                    ]}
                    renderItem={this.renderItem}
                />
            </ScrollView>
        );
    };
    renderItem = ({item}) => {
        return (
            <View style={listStyles.item}>
                <Icon style={listStyles.icon} name={item.icon} size={30} color="#008ACE"/>
                <Text style={commonStyles.text}>{item.name}</Text>
                <TouchableOpacity style={listStyles.link} onPress={() => this.onPressItem({item})}>
                    <Icon name='chevron-circle-right' size={30} color="#333"/>
                </TouchableOpacity>
            </View>
        )
    };
    onPressItem({item}) {
        console.log('It works!');
        const {navigate} = this.props.navigation;
        navigate('Item', { item });
    }
}

export default List;