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

module.exports = indexCtrl;