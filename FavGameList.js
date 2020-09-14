import GameList from './GameList';
import React, { Component } from 'react';
import {
    FlatList,
    Image,
    RefreshControl,
    View,
    Alert,
    Button,
    Text,
  } from 'react-native';
import Realm from 'realm';
import {VideoGameSchema} from './GameDetails';

const realm = new Realm({
    path: 'default.realm',
    schema: [VideoGameSchema],
})
export default class FavGameList extends Component
{
    constructor(props)
    {
        super(props);

        this.props.navigation.setOptions({
            title: 'Favorites Games'
        });
        
          
          this.state = {
            isFetching: false,
            game_details: realm.objects('Game'),
            refreshing: false
          };
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.setState({refreshing: false});
    }

    render(){
        return (
          <View style={{flex: 1}}>
              <FlatList
              data={this.state.game_details}    
              renderItem={this.renderGameItem.bind(this)}
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}
                />
          </View>
        );
      }

    renderGameItem({item})
    {
      return(
  
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 100, height: 150}} 
       source={item.game_image!=null?{
         uri: item.game_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.game_name}</Text>
          <Text>{item.game_released}</Text>
          <Button onPress={ () => 
            Alert.alert(
              "Delete",
              "Are you sure you want to delete it from your favorite list?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => 
                realm.write(() => {
                  realm.delete(
                    realm.objects('Game').filtered('game_id =' + item.game_id)
                  );
                  this.setState({ isFetching: true }, function() { this.render() });
                  alert(" This game has been correctly deleted from the list of favorites");
                }),
              }
              ],
              { cancelable: true}
            )
          }  
          title="Delete favorite 💔"          
        />
        </View>
      </View>
      );
  }
    
}