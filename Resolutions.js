Resolution = new Mongo.Collection("resolutions");

if (Meteor.isClient) {
    Template.body.helpers({
        resolutions: function() {
            if (Session.get("hideFinished")) {
                return Resolution.find({
                    checked: {
                        $ne: true
                    }
                })

            } else {
                return Resolution.find();
            }

        },
        hideFinished: function() {
            return Session.get("hideFinished");

        }
    });
    Template.body.events({
        "submit .new-resolution": function(event) {
            var title = event.target.title.value;
            Resolution.insert({
                title: title,
                createdAt: new Date()
            });
            event.target.title.value = "";
            return false;
        },
        "change .hide-finished": function(event) {
            Session.set("hideFinished", event.target.checked)
        }
    });
    Template.resolution.events({
        "click .toggle-checked": function() {
            Resolution.update(this._id, {
                $set: {
                    checked: !this.checked
                }
            });
        },
        "click .delete": function() {
            Resolution.remove(this._id);
        }
    });
    Accounts.ui.config({

        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
