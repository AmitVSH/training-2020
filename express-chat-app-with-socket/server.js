// require('./models/db');

const express = require('express');
const http = require('http');
const moment = require('moment')

// const userController = require('./controllers/userController');
const path = require('path');
const expresshbs = require('express-handlebars');
const bodyparser = require('body-parser');
const socketio = require('socket.io');

const { joinUser, getUser, removeUser, getRoomUsers } = require('./utils/users')


var app = express();
const server = http.createServer(app);
const io = socketio(server)

// socket
io.on('connection', socket => {
    console.log('New WS')

    

    

    // join room
    socket.on('joinChat', ({ name, room }) => {

        const user = joinUser(socket.id, name, room)

        socket.join(user.room)

        // welcome
        // let msg = {type: 'info', content: user.name+' has joined chat.', id: socket.id, name: user.name, time: moment().format('h:mm a') }
        // socket.emit('message', msg )

        //broadcast when user connects
        let msg = {type: 'info', content: user.name+' has joined chat.', id: socket.id, name: user.name, time: moment().format('h:mm a') }
        socket.broadcast.to(user.room).emit('message', msg )
        
        // console.log('Message: ', content)
        // let msg = { content: content, id:1, name: user.name , time: moment().format('h:mm a') }
        // io.emit('message', msg)

        io.to(user.room).emit('users_updated', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })
    
    // runs when someone leaves
    socket.on('chatMessage', (content) => {
        console.log('Message: ', content)
        const user = getUser(socket.id)
        let msg = {type: 'msg', content: content, id: socket.id, name: user.name, time: moment().format('h:mm a') }
        io.to(user.room).emit('message', msg)
    })

    // runs when someone leaves
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(!!user)
        {
            const msg = {type: 'info', content: user.name+ " has left the chat.", id: socket.id, name: user.name, time: moment().format('h:mm a') }
            io.to(user.room).emit('message', msg )

            io.to(user.room).emit('users_updated', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})





app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
//set public static folder
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expresshbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

server.listen(3000, () => {
  console.log("Server started at port number: 3000");
})

// app.use('/users', userController);
