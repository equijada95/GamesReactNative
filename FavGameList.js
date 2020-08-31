import GameList from './GameList';
import React, { Component } from 'react';
import {
    FlatList,
    SectionList,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    View,
    TouchableHighlight,
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
            game_details: realm.objects('Game')
          };
    }

    render(){
        return (
          <View style={{flex: 1}}>
              <FlatList
              data={this.state.game_details}    
              renderItem={this.renderGameItem.bind(this)}
                
                />
          </View>
        );
      }

    renderGameItem({item})
    {
      return(
  
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 50, height: 75}} 
       source={item.game_image!=null?{
         uri: item.game_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item.game_name}</Text>
          <Text>{item.game_released}</Text>
          <TouchableHighlight onPress={ () => 
            realm.write(() => {
              realm.delete(
                realm.objects('Game').filtered('game_id =' + item.game_id)
            );
          })
          }  >
          <Text>Delete favorite</Text>
        </TouchableHighlight>
        </View>
      </View>
      );
  }

  deleteFavorite({item})
  {
    realm.write(() => {
      realm.delete(
        realm.objects('Game').filtered('game_id =' + item.game_id)
      );
    });
  }

    
}