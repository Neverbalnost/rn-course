import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/commonStyles';
import itemStyles from '../styles/screens/itemStyles';

class Item extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerLeft: (
            <TouchableOpacity
                style={itemStyles.backButtonIcon}
                onPress={() => navigation.navigate('List')}>
                <Icon name={'chevron-circle-left'} size={30} color={'#008ACE'}/>
            </TouchableOpacity>
        )
    });
    render() {
        const { navigation } = this.props;
        const item  = navigation.getParam('item');
        const {navigate} = navigation;
        return (
            <View style={itemStyles.itemView}>
                <View style={itemStyles.header}>
                    <Icon style={itemStyles.icon} name={item.icon} size={60} color="#008ACE"/>
                    <Text style={[commonStyles.text, commonStyles.h1]}>{item.name}</Text>
                </View>
                <View style={itemStyles.paragraph}>
                    <Text style={[commonStyles.text, itemStyles.text]}>{item.text}</Text>
                </View>
                <View style={itemStyles.footer}>
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={() => navigate('List')}
                    >
                        <Text style={[commonStyles.buttonText, commonStyles.text]}>Other stuff</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Item;
