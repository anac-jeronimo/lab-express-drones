const express = require('express');
const { update } = require('../models/Drone.model.js');

// require the Drone model here
const Drones = require('../models/Drone.model.js');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drones.find()
  .then((allTheDronesFromDB) => {
    res.render('drones/list', {drones: allTheDronesFromDB}); 
  })
  .catch((err) => {
    res.render('error', {err});
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
 res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
 let {name, propellers, maxspeed} = req.body;
 Drones.create({
   name, 
   propellers, 
   maxspeed
 }).then(()=> {
   res.redirect('/drones');
 });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let dronesId = req.params.id;
  Drones.findById(dronesId)
  .then((theDroneFound) => {
    res.render('drones/update-form', {drones: theDroneFound});
  })
  .catch((err) => {
    res.render('error', { err});
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let dronesId = req.params.id;
  let { name, propellers, maxspeed} = req.body;
  Drones.findByIdAndUpdate(dronesId, {
    name, 
    propellers,
    maxspeed
  }).then((updateDrone) => {
    res.redirect('/drones');
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
 let dronesId = req.params.id;
 Drones.findByIdAndDelete(dronesId) 
 .then(() => {
   res.redirect('/drones');
 })
});

module.exports = router;
