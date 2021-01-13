//creamos un objeto para poder usarlos en las rutas
const indexCtrl = {};

//renderizar index
indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

//Renderizar pagina about
indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

//Renderizar pagina politics
indexCtrl.renderPolitics = (req, res) => {
  res.render('politics');
};

//Renderizar pagina privacy
indexCtrl.renderPrivacy = (req, res) => {
  res.render('privacy');
};

module.exports = indexCtrl;