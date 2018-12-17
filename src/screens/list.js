import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import commonStyles from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import listStyles from '../styles/screens/listStyles';

class List extends React.Component {
    static navigationOptions = {
        title: 'List of stuff',
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            offset: 0
        };
    }
    render() {
        return (
            <ScrollView style={commonStyles.commonView}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
            >
                <Text style={[commonStyles.text, commonStyles.h1]}>The stuff</Text>
                <Text style={[commonStyles.text, commonStyles.h2]}>which I need for coding</Text>
                <FlatList
                    data={[
                        {key: 'a', name: 'Energy', icon: 'rocket', text: 'Everyone needs their batteries charged to code effectively.'},
                        {key: 'b', name: 'A brave heart', icon: 'heart', text: 'Legacy code doesn\'t scare me! (Almost.)'},
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
        const {navigate} = this.props.navigation;
        navigate('Item', { item, title: item.name });
    };
    onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData()
             .then((response) => response.json())
             .then((responseJson) => {
                 this.setState({refreshing: false});
                 this.setState({listData: responseJson});
        })
    };
    fetchData = () => {
        return (
            fetch('http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=10')
        )
    }
}

export default List;
