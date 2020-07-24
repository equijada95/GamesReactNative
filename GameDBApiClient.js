export default class GamedbApiClient
{
  static BASE_URL = 'https://api.rawg.io/api/games';

  async getGtaGames(page) 
  {
    let url = `${GamedbApiClient.BASE_URL}?search=gta&page=${page}`;
    console.log(url);
    const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      return ({
          resultGames: responseJSON.results,
          numberOfPages: Math.ceil(responseJSON.count/20),
      });
  }

  async getFFGames(page) 
  {
    let url = `${GamedbApiClient.BASE_URL}?search=final%20fantasy&page=${page}`;
    console.log(url);
    const response = await fetch(url);
      const responseJSON = await response.json();
      console.log(responseJSON);
      return ({
          resultGames: responseJSON.results,
          numberOfPages: Math.ceil(responseJSON.count/20),
      });
  }


}