module.exports = function(router, database) {

  router.get('/properties', (req, res) => {
    database.getAllProperties(req.query, 20)
    .then(properties => res.send({properties}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/reservations/:id', (req, res) => {
    const userId = req.session.userId;
    const propertyId = req.params.id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    let reservation = [start_date, end_date, propertyId, userId];
    database.addReservation(reservation)
    .then(reservation => {
      res.send('Success');
    })
    .catch(e => {
      console.log(e);
      res.send(e)
    });
    
    // if (!userId) {
    //   res.error("💩");
    //   return;
    // }
    // database.addReservation({...req.body, owner_id: userId})
    // .then()
  })

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}