import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import commonStyles from '../styles/commonStyles';

class Initial extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={commonStyles.commonView}>
                <Image
                    style={commonStyles.logo}
                    resizeMode='contain'
                    source={require('../assets/images/fox.png')}
                />
                <Text style={[commonStyles.text, commonStyles.h1]}>The login page</Text>
                <TextInput
                    placeholder={'e-mail'}
                    style={commonStyles.input}
                />
                <TextInput
                    placeholder={'password'}
                    style={commonStyles.input}
                />
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => navigate('List')}
                >
                    <Text style={[commonStyles.text, commonStyles.buttonText]}>Tap me!</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };
}

export default Initial;