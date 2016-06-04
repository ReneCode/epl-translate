

function showHomePage(req, res) {
    res.render('index');
}


module.exports = function(app, models) {
    
    app.get('/', showHomePage);
    app.use('/api/translation', require('../api/translation')(models));    
    app.use('/api/translate', require('../api/translate')(models));   
  
    
}