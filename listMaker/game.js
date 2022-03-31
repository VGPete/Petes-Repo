export default class Game {
    constructor(game) {
        this.id = game.id;
        this.released = game.released;
        this.background_image = game.background_image;
        this.metacritic = game.metacritic;
        this.playtime = game.playtime;
        this.name = game.name;
        this.esrb_rating = game.esrb_rating;
        this.slug = game.slug;


        //arrays
        this.platforms = game.platforms;
        this.genres = game.genres;
        this.short_screenshots = game.short_screenshots;
    }

    addGameToList(list, game) {
        if (this.checkForDuplicate(list, game) === false) {
            list.list.push(game)
        }
    }

    checkForDuplicate(list, game) {
        let duplicate = false;
        list.list.forEach(element => {
            if (element.id === game.id) {
                duplicate = true;
                document.getElementById("error").className = "error"
                document.getElementById("error").innerHTML = "<h4>This list already includes that game!</h4>"
                setTimeout(function(){
                    document.getElementById("error").className = ""
                    document.getElementById("error").innerHTML = ""
                }, 1500)
            }
        });
        return duplicate;
    }



}