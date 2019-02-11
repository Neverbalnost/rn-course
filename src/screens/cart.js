import React from 'react';
import {
    AsyncStorage,
    Text,
    View
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import listStyles from '../styles/screens/listStyles';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('cart').then((cart) => {
            this.setState({cart: JSON.parse(cart)})
            console.log('cart ', cart);
        });
    }

    render() {
        return (
            <View style={commonStyles.commonView}>
                <Text></Text>
            </View>
        )
    }

}

export default Cart;
