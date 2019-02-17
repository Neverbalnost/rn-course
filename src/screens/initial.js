import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Platform,
    UIManager,
    LayoutAnimation,
    Vibration,
    NetInfo
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import FormInput from '../partials/formInput';
import ErrorModal from '../partials/errorModal';
import {
    Sentry,
    SentrySeverity,
    SentryLog
} from 'react-native-sentry';

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
            passError: '',
            modalMessage: ''
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
            vibrationPattern = [500, 500, 500]
        }
    }
    componentWillMount() {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type == 'none') {
                this.setState({modalMessage: 'Consider turning some Wi-Fi or mobile Internet on!'})
                this.toggleModal(true);
            }
        });
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {if (token) {this.props.navigation.navigate('List')}})
    }

    render() {
        return (
            <ScrollView style={commonStyles.commonView}>
                <ErrorModal
                  visible={this.state.modalVisible}
                  onRequestClose={() => {this.toggleModal(false)}}
                  message={this.state.modalMessage}
                  onButtonTap={this.onButtonTap}/>
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
        AsyncStorage.setItem('token', token)
    }

    onButtonTap = () => {
        this.toggleModal(false);
        if (!this.state.passError && !this.state.usernameError) {
            return this.authorize()
                .then((response) => response.json())
                .then((responseJson) => {
                    if (!responseJson.message) {
                        this.saveToken(responseJson);
                        this.props.navigation.navigate('List');
                    } else {
                        Sentry.captureException(new Error(`Authorization Error ${responseJson.message}`), {
                            logger: 'Initial',
                            level: SentrySeverity.Info
                        });
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        this.setState({errorText: responseJson.message});
                    }
                })
                .catch((e) => {
                    Sentry.captureException(new Error(`Authorization Error: ${e.name} ${e.message}`), {
                        logger: 'Initial',
                        level: SentrySeverity.Fatal
                    });
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
