const socket = io()

const app = new Vue({
    el: '#app',
    data() {
      return {
          isRoomJoined: false,
          name: '',
          room: 'amit',
          message: '',
          msgs:  [],
          users: []
      }
    },

    mounted() {
        socket.on('message', msg => {
            console.log("Got message: ", socket.id, msg)
            msg.isSelf = msg.id == socket.id
            this.msgs.push(msg)
        })

        socket.on('users_updated', data => {
            this.users = data.users
        })

        
    },

    methods: {
        joinChat() {
            console.log('asa')
            this.isRoomJoined = true;
            socket.emit('joinChat', {name: this.name, room: this.room} )
        },
        
        sendMessage() {
            socket.emit('chatMessage', this.message)
            this.message = '';
            
            var chatContainer = this.$refs.chatContainer;
            chatContainer.scrollTop = chatContainer.scrollHeight + 500;

            console.log(chatContainer.scrollTop, chatContainer.scrollHeight)
        }
    }
});
