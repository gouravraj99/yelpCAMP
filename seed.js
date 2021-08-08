var Comment=require("./models/comment.js");
var Campground= require("./models/campground.js");

var camps=     [
                  {
                    name:"Nothern Lights", 
                   img_url:"https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  description: "Nothern Lights is a wonder which should be seen once in a lifetime."
                  },
                  {
                    name:"Mountain Range", 
                   img_url:"https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                  description: "if mountanious views are your taste."
                  },
                  {
                    name:"Cloud's Rest", 
                   img_url:"https://images.unsplash.com/photo-1528433556524-74e7e3bfa599?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                  description: "float around the clouds."
                  },
                  {
                    name:"Colour Park", 
                   img_url:"https://images.unsplash.com/photo-1542338106-1b4bfe84d5df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                  description: "Colourful skies full of joy and Energy"
                  },
                  {
                    name:"Snowy Sight", 
                   img_url:"https://images.unsplash.com/photo-1568872321643-14b2408cd5f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
                  description: "Embrace the beauty of Himalayas of Indian mountain range"
                  },{
                    name:"Green Everywhere", 
                   img_url:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1088&q=80",
                  description: "Fill yourself with greenry ans lush."
                  },{
                    name:"Night Escape", 
                   img_url:"https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
                  description: "Beautiful nights will give you goosebumbs"
                  },{
                    name:"Rivery Plain", 
                   img_url:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                  description: "Colourful skies full of joy and Energy"
                  },{
                    name:"Inside Sight", 
                   img_url:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                  description: "Lovely views across the hills"
                  },





              ];

//REMOVE ALL CAMPGROUNDS
function SeedDB()
{

//REMOVE COMMENTS
        Comment.remove({},function(error)
            {
            if(error)
            console.log(comment);
            else
            console.log("Removed all comments!!");
            });
//ADD CAMPGROUNDS
        camps.forEach(function(data)
         {
            Campground.create(data,function(error,newly_created_campground)
            {
                if(error)
                console.log(error);
                else
                {
                    console.log("Added a campground!!");
                   // console.log(camp);
                    Comment.create({
                            text:"This place is nice but I wish there was internet.",
                            author:"Homer"
                        },function(error,newly_created_comment)
                        {
                            if(error)
                            console.log(error);
                            else
                            {
                                newly_created_campground.comment.push(newly_created_comment);
                                newly_created_campground.save();
                                console.log("Comment Added!");
                            }
                        });
                }
            });
             

    });



}
module.exports = SeedDB;