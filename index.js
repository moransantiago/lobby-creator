const { LobbyCreator } = require('./classes/lobby-creator')

const main = async () => {
    try {
        const creator = new LobbyCreator()
        await creator.createLobby()
    } catch (err) {
        console.log(err)
    }
}

main()