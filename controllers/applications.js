// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here



// controllers/applications.js

router.get('/', async (req, res) => {
  try {
    
    const currentUser = await User.findById(req.session.user._id);
    res.render('applications/index.ejs', {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

// controllers/applications.js

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

// controllers/applications.js


router.get('/:applicationId', async (req, res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)
      const application = currentUser.applications.id(req.params.applicationId)
      res.render('applications/show.ejs', {
          application
      })
  }catch(err){
      console.log(err)
      res.redirect('/')
  }
});

router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});



router.post('/', async(req,res) =>{
  try{
      const currentUser = await User.findById(req.session.user._id)
      currentUser.applications.push(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/applications`)
  }catch(err){
      console.log(err)
      res.redirect('/')
  }
})

router.put('/:applicationId', async (req, res) => {
  try {
    
    const currentUser = await User.findById(req.session.user._id);
    const application = currentUser.applications.id(req.params.applicationId);
    application.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/applications/${req.params.applicationId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.delete('/:applicationId', async(req,res) => {
  try{
      const currentUser = await User.findById(req.session.user._id)

      currentUser.applications.id(req.params.applicationId).deleteOne()

      await currentUser.save()

      res.redirect(`/users/${currentUser._id}/applications`)
  }catch(err){
      console.log(err)
      res.redirect('/')
  }
})
  

module.exports = router;
