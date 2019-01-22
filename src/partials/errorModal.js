import React from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity
} from 'react-native';
import commonStyles from '../styles/commonStyles';
import LottieView from 'lottie-react-native';

const standartMessage = 'Seems that you have some connection issues!';

class ErrorModal extends React.Component {
    render() {
        return (
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.props.visible}
              onRequestClose={() => {this.props.onRequestClose(false)}}>
              <View style={commonStyles.centeredView}>
                <View style={commonStyles.centeredView}>
                    <Text style={[commonStyles.text, commonStyles.h1]}>Oh no!</Text>
                    <Text style={[commonStyles.text, commonStyles.h2, commonStyles.textGray]}>{this.props.message ? this.props.message : standartMessage}</Text>
                    <LottieView
                        style={commonStyles.animationContainer}
                        source={require('../assets/animation/disconnected.json')}
                        autoPlay
                        loop
                    />
                    <View style={commonStyles.buttonContainer}>
                        <TouchableOpacity
                            style={commonStyles.button}
                            onPress={this.props.onButtonTap}>
                            <Text style={[commonStyles.text, commonStyles.buttonText]}>Try again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[commonStyles.button, commonStyles.buttonRed]}
                            onPress={() => {
                                this.props.onRequestClose(false);
                            }}>
                            <Text style={[commonStyles.text, commonStyles.buttonText]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
            </Modal>
        )
    }
}

export default ErrorModal;
