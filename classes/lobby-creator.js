const puppeteer = require('puppeteer')

module.exports = {
    LobbyCreator: 
        class LobbyCreator {
            constructor(url = 'https://gamersclub.com.br/lobby', navigator = 'firefox') {
                this.url = url
                this.navigator = navigator
                this.GBLobbyPage = null
            }
        
            async createLobby () {
                this.GBLobbyPage = await this.openGCLobby(this.url, this.navigator)

                let createdRooms = undefined
                while (!createdRooms) {
                    try {
                        createdRooms = await this.GBLobbyPage.$('#countLobby')
                    } catch (err) {
                        console.log(err)
                    }
                }

                const createLobby = await this.GBLobbyPage.$('span.lobby-create-room.create-room-ok')
                console.log(createLobby)
            }

            async openGCLobby (url, navigator) {
                const browser = await puppeteer.launch({
                    headless: false,
                    product: navigator,
                    defaultViewport: null,
                    slowMo: 250
                }) 
                const [page] = await browser.pages()
                await page.goto(url)

                return page
            }
        }
}