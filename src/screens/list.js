import React from 'react';
import {
    Animated,
    Easing,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/commonStyles';
import listStyles from '../styles/screens/listStyles';
import LottieView from 'lottie-react-native';

class List extends React.Component {
    static navigationOptions = {
        title: 'List of stuff',
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            limit: 10,
            pageNum: 1,
            listData: [],
            loading: false
        };
    }
    componentWillMount() {
        this.onRefresh();
    }
    render() {
        return (
            this.state.listData &&
            <View>
                <FlatList
                    style={commonStyles.commonView}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    onEndReached={this.onListEnd}
                    onEndReachedThreshold={0.1}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        colors={['#D35D47', '#008ACE']}
                        progressViewOffset={60}
                      />
                    }
                    ListHeaderComponent={this.listHeader}
                    ListFooterComponent={this.listFooter}
                />
            </View>
        );
    };
    listHeader = () => <Text style={[commonStyles.text, commonStyles.h1]}>The stuff</Text>
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
        const rotation = rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        });
        let transformStyle = { transform: [{ rotate: rotation }] };
        return (
            <View style={listStyles.item}>
                <Icon style={listStyles.icon} name={item.icon} size={30} color="#008ACE"/>
                <Text style={commonStyles.text}>{item.name}</Text>
                <TouchableOpacity
                    style={listStyles.link}
                    onPress={() => this.onPressItem({item})}
                    onPressIn={() => {
                        Animated.timing(rotateValue, {
                            toValue: 1,
                            duration: 150,
                            easing: Easing.linear()
                        }).start();
                    }}
                    onPressOut={() => {
                        Animated.timing(rotateValue, {
                            toValue: 0,
                            duration: 150,
                            easing: Easing.linear()
                        }).start();
                    }}
                >
                    <Animated.View style={transformStyle}>
                        <Icon name='chevron-circle-right' size={30} color="#333"/>
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
        this.setState({pageNum: 1, refreshing: true});
        this.fetchData(limit, 1)
            .then((responseJson) => {
                this.setState({refreshing: false});
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
        )
    }
}

export default List;
