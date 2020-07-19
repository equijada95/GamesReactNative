export default class TvdbApiClient
{
  static BASE_URL = 'https://api.rawg.io/api/games';

  async getGtaGames(page) 
  {
    let url = `${TvdbApiClient.BASE_URL}?search=gta&page=${page}`;
    console.log(url);
    const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      return ({
          resultGames: responseJSON.results,
      });
  }

  async getFFGames(page) 
  {
    let url = `${TvdbApiClient.BASE_URL}?search=final%20fantasy&page=${page}`;
    console.log(url);
    const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      return ({
          resultGames: responseJSON.results,
      });
  }


}