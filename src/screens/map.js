import React from 'react';
import { View, Text } from 'react-native';
import { MapView, Marker } from 'react-native-maps';

class Map extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title} on map!`,
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

        return (
            <View>
                <Text>Behold The Map!</Text>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{latitude: 45.65, longitude: -78.90}}
                        title={item.name}
                    />
                </MapView>
            </View>
        )
    }
}

export default Map;
