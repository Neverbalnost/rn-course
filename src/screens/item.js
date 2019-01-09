import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Animated,
    Easing
    } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import commonStyles from '../styles/commonStyles';
import itemStyles from '../styles/screens/itemStyles';

class Item extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerLeft: (
            <TouchableOpacity
                style={commonStyles.backButtonIcon}
                onPress={() => navigation.navigate('List')}>
                <Icon name={'chevron-circle-left'} size={30} color={'#008ACE'}/>
            </TouchableOpacity>
        )
    });
    constructor(props) {
        super(props);
        this.state = {
            maxPanelHeight: 200,
            minPanelHeight: 0,
            panelScrollDist: 200,
            scrollY: new Animated.Value(0),
        }
    }
    componentDidMount() {
        this.arrow.play(40, 50);

    }
    render() {
        const { maxPanelHeight, minPanelHeight, panelScrollDist } = this.state;
        const panelHeight = this.state.scrollY.interpolate({
            inputRange: [0, panelScrollDist],
            outputRange: [minPanelHeight, maxPanelHeight],
            extrapolate: 'clamp',
        });
        const { navigation } = this.props;
        const item  = navigation.getParam('item');
        const {navigate} = navigation;
        return (
            <ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                )}
            >
                <View style={itemStyles.itemView}>
                    <View style={itemStyles.header}>
                        <TouchableOpacity onPress={() => navigate('Map', { item, title: item.name })}>
                            <Icon style={itemStyles.icon} name={'map'} size={60} color="#008ACE"/>
                        </TouchableOpacity>
                        <Text style={[commonStyles.text, commonStyles.h1]}>{item.name}</Text>
                    </View>
                    <View style={itemStyles.paragraph}>
                        <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat felis eu commodo imperdiet. In hac habitasse platea dictumst. Ut feugiat leo tellus, a sodales ex dignissim quis. Aenean luctus consectetur ipsum in tristique. Pellentesque sed laoreet enim, eget ultricies ipsum. Praesent vehicula ultrices tellus, sit amet imperdiet magna. Integer eu diam in felis dictum tempor. Fusce a malesuada nunc.
                        </Text>
                        <Text style={[commonStyles.text, itemStyles.text]}>Price: ${item.price}</Text>
                    </View>
                    <LottieView
                        style={itemStyles.arrowAnim}
                        ref={arrow => {
                            this.arrow = arrow;
                        }}
                        loop={false}
                        source={require('../assets/animation/arrow.json')}
                    />
                </View>
                <Animated.View style={[itemStyles.moreInfo, {height: panelHeight}]}>
                    <Text style={itemStyles.moreInfoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras sagittis placerat risus, non tristique tortor ullamcorper eu.
                    Nulla dictum tortor leo, at ornare quam ornare.
                    Integer at quam lacinia, dignissim velit vel, sodales elit. Maecenas nunc tortor, iaculis eu mi a, maximus scelerisque dolor. Donec ullamcorper massa a tellus viverra euismod. In hac habitasse platea dictumst. Morbi sit amet eros tempor, interdum nibh fringilla, suscipit ipsum. Quisque et lorem at leo luctus fringilla.</Text>
                </Animated.View>
            </ScrollView>
        )
    }
}

export default Item;
