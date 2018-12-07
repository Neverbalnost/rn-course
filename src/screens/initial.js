import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import commonStyles from '../styles/commonStyles';

class Initial extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {errorText: ''};
    }

    render() {
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
                    textContentType={'username'}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    placeholder={'password'}
                    style={commonStyles.input}
                    textContentType={'password'}
                    onChangeText={(password) => this.setState({password})}
                />
                <Text style={commonStyles.error}>{this.state.errorText}</Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={this.onButtonTap}
                >
                    <Text style={[commonStyles.text, commonStyles.buttonText]}>Tap me!</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    onButtonTap = () => {
        return this.authorize()
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (!responseJson.message) {
                    this.props.navigation.navigate('List');
                } else {
                    this.setState({errorText: responseJson.message});
                }
            })
    };

    authorize = () => {
        return (
            fetch('http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                }),
            })
        )
    };
}

export default Initial;