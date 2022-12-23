export async function initial(Role) {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user",
        }).save((err) => {
          if (err) {
            console.error("error", err);
          }
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator",
        }).save((err) => {
          if (err) {
            console.error("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.error("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  