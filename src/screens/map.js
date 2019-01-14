import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import mapStyles from '../styles/screens/mapStyles';
import commonStyles from '../styles/commonStyles';

class Map extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title} on map!`,
        headerLeft: (
            <TouchableOpacity
                style={commonStyles.backButtonIcon}
                onPress={() => navigation.navigate('Item', { item: navigation.state.params.item, title: navigation.state.params.title })}>
                <Icon name={'chevron-circle-left'} size={30} color={'#008ACE'}/>
            </TouchableOpacity>
        )
    });
    constructor(props) {
        super(props);
        const itemName  = this.props.navigation.getParam('item').name;
        this.props.navigation.setParams({
            title: itemName
        });
    }
    render() {
        const item  = this.props.navigation.getParam('item');
        const marker = {
            latlng: {
              latitude: 37.78825,
              longitude: -122.4324,
            },
            title: item.name,
            description: 'Donec ut pretium enim, id hendrerit ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }

        return (
            <ScrollView>
                <View style={mapStyles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={mapStyles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => Linking.openURL(`tel:+79215602212`)}
                        />
                    </MapView>
                </View>
                <View style={commonStyles.commonView}>
                    <TouchableOpacity
                        style={commonStyles.inlineContainer}
                        onPress={() => Linking.openURL(`tel:+79215602212`)}>
                        <Icon style={commonStyles.icon} name={'phone'} size={40} color={'#008ACE'}/>
                        <Text style={[commonStyles.text, commonStyles.h2]}>Call us</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default Map;
