import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Modal,
    Platform,
    UIManager,
    LayoutAnimation,
    View,
    Vibration
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import LottieView from 'lottie-react-native';
import FormInput from '../partials/formInput';

let vibrationPattern = [0, 500];

class Initial extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            errorText: '',
            modalVisible: false,
            usernameError: '',
            passError: ''
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
            vibrationPattern = [500, 500, 500]
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(() => this.props.navigation.navigate('List'))
    }

    render() {
        return (
            <ScrollView style={commonStyles.commonView}>
                <Modal
                  animationType="fade"
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
                <FormInput
                    placeholder={'e-mail'}
                    type={'username'}
                    value={this.state.username}
                    errorText={this.state.usernameError}
                    onChangeText={(username) => this.validateField('username', username)}
                />
                <FormInput
                    placeholder={'password'}
                    type={'password'}
                    secureTextEntry={true}
                    value={this.state.password}
                    errorText={this.state.passError}
                    onChangeText={(password) => this.validateField('password', password)}
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

    saveToken = (token) => {
        AsyncStorage.setItem({ token })
    }

    onButtonTap = () => {
        // this.props.navigation.navigate('List');
        if (!this.state.passError && !this.state.usernameError) {
            return this.authorize()
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson.message) {
                        this.saveToken(responseJson);
                        this.props.navigation.navigate('List');
                    } else {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        this.setState({errorText: responseJson.message});
                    }
                })
                .catch(() => {
                    this.toggleModal(true);
                })
        }
    };

    validateField = (type, value) => {
        switch(type) {
            case 'username':
                const mailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.setState({username: value});
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                !mailRe.test(this.state.username) ? this.setState({usernameError: 'This e-mail seems suspicious!'}) : this.setState({usernameError: ''});
                break;
            case 'password':
                this.setState({password: value});
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                this.state.password && this.state.password.length < 3 ? this.setState({passError: 'C\'mon! Is it even a password?'}) : this.setState({passError: ''});
                break;
        }
    }

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
        if (value) Vibration.vibrate(vibrationPattern);
        this.setState({modalVisible: value});
    }
}

export default Initial;
