import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    View
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import LottieView from 'lottie-react-native';

class Initial extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            errorText: '',
            modalVisible: false,
            username: 'elena_kogodeeva@epam.com',
            password: 'PinkUnicorn99'
        };
    }

    render() {
        return (
            <ScrollView style={commonStyles.commonView}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {this.toggleModal(false)}}>
                  <View style={commonStyles.centeredView}>
                    <View style={commonStyles.centeredView}>
                        <Text style={[commonStyles.text, commonStyles.h1]}>Oh no!</Text>
                        <Text style={[commonStyles.text, commonStyles.h2, commonStyles.textGray]}>Seems that you have some connection issues!</Text>
                        <LottieView
                            style={commonStyles.animationContainer}
                            source={require('../assets/animation/disconnected.json')}
                            autoPlay
                            loop
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={this.onButtonTap}>
                                <Text style={[commonStyles.text, commonStyles.buttonText]}>Try again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[commonStyles.button, commonStyles.buttonRed]}
                                onPress={() => {
                                  this.toggleModal(false);
                                }}>
                                <Text style={[commonStyles.text, commonStyles.buttonText]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                </Modal>
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
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    placeholder={'password'}
                    style={commonStyles.input}
                    textContentType={'password'}
                    secureTextEntry={true}
                    value={this.state.password}
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
        // this.props.navigation.navigate('List');
        return this.authorize()
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.message) {
                    this.props.navigation.navigate('List');
                } else {
                    this.setState({errorText: responseJson.message});
                }
            })
            .catch(() => {
                this.toggleModal(true);
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

    toggleModal = (value) => {
        this.setState({modalVisible: value});
    }
}

export default Initial;
