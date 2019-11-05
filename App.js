import React, {Component} from 'react';
import { View, Text, FlatList} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [/*{ title: 'Test 1' }, { title: 'Test 2' }, { title: 'Test 3' }, { title: 'Test 4' }*/],
            isLoading: false
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        let apiURL = 'https://jsonplaceholder.typicode.com/posts'
        this.setState({ isLoading: true })
        fetch(apiURL).then(res => res.json()).then(res => {
            this.setState({items: res});
        }).finally(() => this.setState({isLoading: false}))
    }

    renderRow = ({item}) => {
        return(
            <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc'}}>
                <Text>{item.id + ') ' + item.title}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style= {{flex: 1, marginTop: 50}}>
                <FlatList
                    data={this.state.items}
                    renderItem={this.renderRow}
                    refreshing={this.state.isLoading}
                    onRefresh={this.getData}
                    keyExtractor={(i, k) => k.toString()}
                />
            </View>
        )
    }
}
