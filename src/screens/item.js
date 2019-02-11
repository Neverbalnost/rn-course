import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Animated,
    Dimensions,
    NativeModules,
    AsyncStorage,
    NativeEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import commonStyles from '../styles/commonStyles';
import itemStyles from '../styles/screens/itemStyles';

const window = Dimensions.get('window');
const Notifications = NativeModules.Notifications;
const NotificationsEmitter = new NativeEventEmitter(Notifications);

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
            panelScrollDist: 50,
            scrollY: new Animated.Value(0),
            cartNum: null
        }
    }
    componentDidMount() {
        this.arrow.play(40, 50);
        AsyncStorage.getItem('token').then((token) => {
            this.token = token;
            this.getCartNumber();
        });

        Notifications.initModule();

        NotificationsEmitter.addListener('notificationClicked', () => {
            this.props.navigation.navigate('Cart');
        })
    }
    componentWillUnmount() {
        NotificationsEmitter.removeListener('notificationClicked');
    }
    showNotification = (title, message) => {
        const self = this;
        Notifications.showNotifications(
            title,
            message,
            () => {
                self.notificationId = 1
            }
        )
    };
    getCartNumber = () => {
        return (
            fetch('http://ecsc00a02fb3.epam.com/index.php/rest/default/V1/carts/mine', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                }})
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.message) {
                        this.showNotification(
                            'Damn!',
                            `${responseJson.message}`
                        )
                    }
                    this.setState({cartNum: responseJson});
                })
                .catch(() => {
                    this.showNotification(
                        'Oops!',
                        `Cart is not created and we don't know why!`
                    )
                })
        )
    };
    addItemToCart = () => {
        const item  = this.props.navigation.getParam('item');
        console.log('this.token', this.token, '\n this.state.cartNum: ', this.state.cartNum);
        return (
            fetch('http://ecsc00a02fb3.epam.com/index.php/rest/default/V1/carts/mine/items', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    cartItem: {
                        sku: item.sku,
                        qty: 1,
                        quote_id: this.state.cartNum
                    }
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('responseJson: ', responseJson);
                    if (responseJson.message) {
                        this.showNotification(
                            'Oops!',
                            `Cart is not created because ${responseJson.message}`
                        )
                    } else {
                        AsyncStorage.setItem('cart', JSON.stringify(responseJson))
                        this.showNotification(
                            `${item.name} is added to cart`,
                            `Now you have ${responseJson.qty} ${responseJson.name} in your cart!`
                        )
                    }
                })
                .catch(() => {
                    this.showNotification(
                        'Oops!',
                        `Cart is not created and we don't know why!`
                    )
                })
        )
    };
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
                <View  style={[itemStyles.itemView, { height: window.height - this.state.panelScrollDist }]}>
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
                        <TouchableOpacity style={commonStyles.button} onPress={this.addItemToCart}>
                            <Text style={[commonStyles.buttonText]}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <LottieView
                        style={itemStyles.arrowAnim}
                        ref={arrow => {
                            this.arrow = arrow;
                        }}
                        loop={false}
                        progress={this.state.scrollY}
                        source={require('../assets/animation/arrow.json')}
                    />
                </View >
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
