// on instancie express

const { Socket } = require("dgram");

const app=require("express")();

// on cree le serveuur http 

const http=require("http").createServer(app);
//on instancie socket.io

const io=require('socket.io')(http)


//on crée la route / 
app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");
})
//on écoute l'événement connection de socket.io

io.on('connection',(Socket) =>{

    console.log("une cnnection s'active ");

    // on ecouter les deconnexions

    Socket.on('disconnect',()=>{
        console.log('un utilisateur s est deconnecter');

    });
    //on gere le chat 
    Socket.on("chat_message",(msg)=>{

        //relais du message vers tous les utlisateurs connectés
        io.emit("received_message",msg);


    })

});

//on va demander au serveur http de repondre sur le port 3000

http.listen(3000, ()=>{

     console.log("j'écoute le port 3000");

})