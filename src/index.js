'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    //strapi.server.httpServer is the new update for Strapi V4
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    strapi.io=io;

    io.on("connection", function (socket) {
      console.log(socket.id)
      // send message on user connection
      io.emit("test","Welcome to my website")

      console.log("****************")

      socket.on('addProduct', (data) => {
        console.log("added product",data); //logs the message from the client
        // productData['products'].push(data);
        // const stringData=JSON.stringify(productData,null,2)
        // fs.writeFile('data.json',stringData,(err)=>{
        //    console.log(err);
        // })
        //Sends back the data after adding a new product
        socket.broadcast.emit('newProductAdded', data);
      });
      // socket.on("bla",(data)=>{
      //   //do something with code
      // })
    });

  },
};
