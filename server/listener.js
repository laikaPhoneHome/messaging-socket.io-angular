

app.get('/', (req ,res) => {
    fs.readFile(`${__dirname}/db/room.db.json`)
    .then((data) => {
        if(data.roomDB){
            'Server is up'
        } else {
            'server is down'
        }
    })
})


http.listen(3000, () => {
    console.log('Listening on port 3000')
})