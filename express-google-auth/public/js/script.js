const app = new Vue({
    el: '#app',
    data() {
      return {
          email: '', password: ''
      }
    },

    mounted() {
    },

    methods: {
        deleteUser(id) {
            console.log("Delete user", id);
            let url = "/users/"+id;
            // axios.delete(url).then(res => {
            //     console.log("Delete API called");
            // })

            fetch(url, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: id
                })
              })
                .then(res => {
                  console.log("Delete API called");
                  if (res.ok) return res.json()
                })
                .then(data => {
                //   window.location.reload()
                })
        },

        deleteVideo(id) {
            console.log("Delete user", id);
            let url = "/videos/"+id;
            // axios.delete(url).then(res => {
            //     console.log("Delete API called");
            // })

            fetch(url, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: id
                })
              })
                .then(res => {
                  console.log("Delete API called");
                  if (res.ok) return res.json()
                })
                .then(data => {
                //   window.location.reload()
                })
        },

        login() {
            let url = "/login";

            fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: this.email,
                  password: this.password
                })
              })
                .then(res => {
                  console.log("Login API called");
                  if (res.ok) return res.json()
                })
                .then(data => {
                    console.log("data: ",data);
                    
                    window.localStorage.setItem('token', data.token)

                    
                    var token = window.localStorage.getItem('token');

                    if (token) {
                        $.ajaxSetup({
                            headers: {
                            'x-access-token': token
                            }
                        });
                    }
                })
        },
    }
});
