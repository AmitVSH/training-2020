class Facebook {
    constructor(meta) {
        this.url = "facebook.com/"+meta.facebookId;
    }

    request() {
        console.log("Sending friend request to: ", this.url )
    }

    cancelRequest() {
        console.log("Friend request cancelled: ", this.url )
    }
};

class Twitter {
    constructor(meta) {
        this.url = "twitter.com/"+meta.twiiterId;
    }

    follow() {
        console.log("Following to: ", this.url )
    }

    unFollow() {
        console.log("Unfollowed to: ", this.url )
    }
};

class LinkedIn {
    constructor(meta) {
        this.url = "linkedin.com/"+meta.linkedinId;
    }

    connect() {
        console.log("Sending Connect Request to: ", this.url )
    }

    disconnect() {
        console.log("Resconnected from: ", this.url )
    }
};


class SocialMedia {
    constructor(type, props) {
        if(type === "facebook")
            return new Facebook(props);
        if(type === "twitter")
            return new Twitter(props);
        if(type === "linkedin")
            return new LinkedIn(props);
    }
};

//
let user = {};
user.meta = {
  facebookId : "fb_98009", 
  twiiterId : "tw_9089890", 
  linkedinId : "ln_0980",
};

user.facebook  = new SocialMedia("facebook", user.meta); 
user.twitter = new SocialMedia("twitter", user.meta);
user.linkedin  = new SocialMedia("linkedin", user.meta);

console.log("\n%cFactory Pattern Example 2: ", "color: #690;");
console.log(user);
user.facebook.request();
user.twitter.follow();
user.linkedin.connect();
user.linkedin.disconnect();