import React from 'react';
import {
    Text,
    TextInput,
    View
} from 'react-native';
import commonStyles from '../styles/commonStyles';

class FormInput extends React.Component {
    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={commonStyles.input}
                    textContentType={this.props.type}
                    secureTextEntry={this.props.secureTextEntry}
                    value={this.props.value}
                    onChangeText={(value) => this.props.onChangeText(value)}
                />
                {this.props.errorText.length > 0 && (<Text style={commonStyles.error}>{this.props.errorText}</Text>)}
            </View>
        )
    }
}

export default FormInput;
