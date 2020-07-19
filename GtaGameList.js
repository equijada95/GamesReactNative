import GameList from './GameList';


export default class GtaGameList extends GameList
{
    constructor(props)
    {
        super(props);

        this.props.navigation.setOptions({
            title: 'GTA Games'
        });
    }

    async loadPage(page)
  {
    return await this.apiClient.getGtaGames(page);
  }
}