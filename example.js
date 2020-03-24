const {Pool, Client} = require('pg')

let pool = new Pool({
    host: "localhost",
    database: "visitordb",
    user: "user",
    password: "pass",
    port: 5432
});

class MusicData {
    constructor(artist, featuring, song, album, year, composer){
        this.artist = artist
        this.featuring = featuring
        this.album = album
        this.song = song
        this.year = year
        this.composer = composer
    }



createTable = (table)=> {
    pool.connect()
    pool.query('CREATE TABLE '+table+'(songID SERIAL PRIMARY KEY, artist VARCHAR(50), featuring VARCHAR(100), song VARCHAR(50) UNIQUE, album VARCHAR(50), year VARCHAR(4), composer VARCHAR(255))',(error, respond) => {
       console.log(error, respond)
       console.log("Successfully created table")
    })
}
deleteTable(table) {
    pool.connect()
    try{
        pool.query("DROP TABLE "+ table+";")
        console.log("Table deleted!")
    }
    catch(e){
        console.log("this is an error" + e)
    }
    finally{
        pool.end()
    }
}
saveSong(table){
    
    try{
        pool.connect()
            pool.query("INSERT  into "+table+ "(artist, featuring, song, album, year, composer) values($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING", [this.artist, this.featuring, this.song, this.album, this.year, this.composer] )
            console.log("Song saved")
        }
    catch(err){   
        console.log(err)
}
finally{
    pool.end()
}
}
}
let table = new MusicData()
let song1 = new MusicData("TBO", "Indigo Stella & Lnlyboy", "Don't start with with me", "Came out of nowhere(The big bang theory", "2020", "Daniel Playy & TBO")
let song2 = new MusicData("Cassper Nyovest", "None", "Good for that", "None", "2020", "TylerICU")
song2.saveSong("mymusic")