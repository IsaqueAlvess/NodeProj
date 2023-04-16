const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if(request.url === '/produto'){
        response.end(JSON.stringify({
            message: "Rota de Produto",
        }));
    }

    if(request.url === '/usuario'){
        response.end(JSON.stringify({
            message: "Rota de Usuários",
        }));
    }

    response.end(JSON.stringify({
            message: "Qualquer outra rota",
        })
    );
})
.listen(4001, ()  => console.log('Server is running at port 4001'));