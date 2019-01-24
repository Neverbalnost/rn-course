import React from 'react';
import {
    Animated,
    Easing,
    FlatList,
    Platform,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    Vibration
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/commonStyles';
import listStyles from '../styles/screens/listStyles';
import LottieView from 'lottie-react-native';
import ErrorModal from '../partials/errorModal';

const AnimatedList = Animated.createAnimatedComponent(FlatList);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let vibrationPattern = [0, 500];

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            limit: 10,
            pageNum: 1,
            listData: [],
            loading: true,
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            modalVisible: false
        };
        if (Platform.OS === 'android') {
            vibrationPattern = [500, 500, 500]
        }
    }
    componentWillMount() {
        this.onRefresh();
    }
    render() {
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        Animated.parallel([headerTranslate, imageOpacity, imageTranslate, titleScale, titleTranslate]);
        return (
            this.state.listData &&
            <View style={listStyles.fill}>
                <ErrorModal
                  visible={this.state.modalVisible}
                  onRequestClose={() => {this.toggleModal(false)}}
                  onButtonTap={this.fetchAgain}/>
                <AnimatedList
                    style={[commonStyles.commonView]}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    onEndReached={this.onListEnd}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            // Android offset for RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                        />
                    }
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                    ListHeaderComponent={this.listHeader}
                    ListFooterComponent={this.listFooter}
                />
                <Animated.View
                    pointerEvents="none"
                    style={[
                        listStyles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >
                    <Animated.Image
                        style={[
                            listStyles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={require('../assets/images/fox_bg.jpg')}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        listStyles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <Text style={[commonStyles.h1, listStyles.title]}>List of stuff</Text>
                </Animated.View>
            </View>
        )
    }
    listHeader = () => <View style={listStyles.scrollViewContent}/>
    listFooter = () => {
        return (
            this.state.loading &&
            <View style={commonStyles.centeredView}>
                <LottieView
                    style={listStyles.animationContainer}
                    source={require('../assets/animation/loader_4.json')}
                    autoPlay
                    loop
                />
            </View>
        )
    }
    renderItem = ({item}) => {
        const rotateValue = new Animated.Value(0);
        const colorValue = new Animated.Value(0);
        const rotation = rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });
        const iconColor = colorValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgb(0, 3, 51)", "rgb(0, 138, 206)"]
        });
        let rotationStyle = { transform: [{ rotate: rotation }] };
        let colorStyle = {color: iconColor};
        return (
            <View>
                <TouchableOpacity
                    style={listStyles.item}
                    activeOpacity={1}
                    onPress={() => this.onPressItem({item})}
                    onPressIn={() => {
                        Animated.parallel([
                            Animated.timing(rotateValue, {
                                toValue: 1,
                                duration: 250,
                                easing: Easing.linear()
                            }).start(),
                            Animated.timing(colorValue, {
                                toValue: 1,
                                duration: 250,
                                easing: Easing.linear()
                            }).start(),
                        ])
                    }}
                    onPressOut={() => {
                        Animated.parallel([
                            Animated.timing(rotateValue, {
                                toValue: 0,
                                duration: 250,
                                easing: Easing.linear()
                            }).start(),
                            Animated.timing(colorValue, {
                                toValue: 0,
                                duration: 250,
                                easing: Easing.linear()
                            }).start(),
                        ])
                    }}
                >
                    <Icon style={listStyles.icon} name={item.icon} size={30} color="#008ACE"/>
                    <Text style={commonStyles.text}>{item.name}</Text>
                    <Animated.View style={[rotationStyle, listStyles.link]}>
                        <AnimatedIcon style={colorStyle} name='chevron-circle-right' size={30}/>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    };
    onPressItem({item}) {
        const {navigate} = this.props.navigation;
        navigate('Item', { item, title: item.name });
    };
    onRefresh = () => {
        const { limit } = this.state;
        this.setState({pageNum: 1});
        this.fetchData(limit, 1)
            .then((responseJson) => {
                this.setState({listData: responseJson.items});
                this.setState({numPages: Math.ceil(responseJson.total_count / limit)});
            });
    };
    onListEnd = () => {
        this.setState({loading: true});
        const { limit, pageNum, listData, numPages } = this.state;
        if (numPages == pageNum) {
            this.setState({loading: false});
            return
        };
        this.fetchData(limit, pageNum + 1)
            .then((responseJson) => {
                const list = listData.concat(responseJson.items);
                this.setState({listData: list});
                this.setState({pageNum: pageNum + 1});
                this.setState({loading: false});
            });

    };
    keyExtractor = (item, index) => item.id.toString();
    fetchData = (limit, pageNum) => {
        return (
            fetch(`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${limit}&searchCriteria[currentPage]=${pageNum}`)
            .then((response) => response.json())
            .catch(() => {
                this.toggleModal(true);
            })
        )
    }
    toggleModal = (value) => {
        if (value) Vibration.vibrate(vibrationPattern);
        this.setState({modalVisible: value});
    }
    fetchAgain = () => {
        this.toggleModal(false);
        this.onRefresh();
    }
}

export default List;
