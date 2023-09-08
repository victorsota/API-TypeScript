import { app }  from './app'

const porta = process.env.PORT  || 5000



/**
 * 
 * Iniciar o servidor
 */

const server = app.listen(porta, () => console.log(`App ouvindo na porta ${porta}`))


/**
 * 
 * Encerra o servidor
 */

process.on('SIGINT', () => {
    server.close
    console.log('App finalizado')
})