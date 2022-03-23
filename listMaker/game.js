export default class Game {
    constructor(game) {
        this.id = game.id;
        this.released = game.released;
        this.background_image = game.background_image;
        this.metacritic = game.metacritic;
        this.playtime = game.playtime;
        this.name = game.name;
        this.esrb_rating = game.esrb_rating;

        //arrays
        this.platforms = game.platforms;
        this.genres = game.genres;
        this.short_screenshots = game.short_screenshots;
    }
}