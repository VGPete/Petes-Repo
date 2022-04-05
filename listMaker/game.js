export default class Game {
    constructor(game) {
        
        if (game.background_image === null) {
            this.background_image = game.background_image
        }
        else {
            this.background_image = game.background_image.slice(0, 28) + 'crop/600/400/'+ game.background_image.slice(28, game.background_image.length)

        }
        if (game.description_raw.length < 401) {
            this.description = game.description_raw;
        }
        else {
            this.description = game.description_raw.slice(0, 400) + '...'
        }
        this.developers = game.developers;
        console.log(this.developers)
        this.esrb_rating = game.esrb_rating;
        this.genres = game.genres;
        this.id = game.id;
        this.metacritic = game.metacritic;
        this.metacritic_url = game.metacritic_url;
        this.name = game.name;
        this.platforms = game.platforms;
        this.playtime = game.playtime;
        this.publishers = game.publishers;
        console.log(this.publishers)
        this.released = game.released;
 
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