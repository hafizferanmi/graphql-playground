const {models} = require('../connection');


exports.getPosts = async (req, res, next) => {
  try {
    const a = await models.posts.findAll()
    res.json({ success: true, results: a})
  } catch (e) {
    console.log('Error occured')
  }
}

exports.createPost = async (req, res) => {
  try {
    const newPost = await models.create({ title: 'Ade Ori okin', userId: 1, summary: 'Some nice articles coming to your ' })
    
    return res.json({newPost})
  } catch (e) {
    
  }
  
}