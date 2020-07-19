import GameList from './GameList';


export default class FFGameList extends GameList
{
    constructor(props)
    {
        super(props);

        this.props.navigation.setOptions({
            title: 'Final Fantasy Games'
        });
    }

    async loadPage(page)
  {
    return await this.apiClient.getFFGames(page);
  }
}