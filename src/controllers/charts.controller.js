const chartsCtrl = {};

// requerimos el modelo de la base de datos de ../models/Orders para poder pasarle los datos
const Order = require("../models/Orders");
// requerimos el modelo de la base de datos de ../models/Schedule para poder pasarle los datos
const Schedule = require("../models/Schedule");

// renderizamos la vista new-order donde se encuentra el formulario para un nuevo pedido
chartsCtrl.renderCharts = async (req, res) => {


    //ORDERS
    const orders = await Order.find({}).sort({ date: "asc" }).lean();
    //creamos un array con todas las fechas de orders
    var fechasOrders = [];
    var date;
    for (let i = 0; i < orders.length; i++) {
        date = new Date(orders[i]['date']);
        fechasOrders.push((date.getMonth() + 1) + "," + date.getDate() + "," + date.getFullYear());
    }
    //quitamos las fechas repetidas y creamos un array con el numero de pedidos por dia
    var numeroDePedidos = [];
    var num;
    for (let i = 0; i < fechasOrders.length; i++) {
        num = 1;
        while (fechasOrders.indexOf(fechasOrders[i]) !== fechasOrders.lastIndexOf(fechasOrders[i])) {
            fechasOrders.splice(fechasOrders.lastIndexOf(fechasOrders[i]), 1);
            num++;
        }
        numeroDePedidos.push(num);
    }

    var ordersData = [];
    for (let i = 0; i < fechasOrders.length; i++) {
        let bidim = {};
        let date = new Date(fechasOrders[i]);
        bidim.anio = date.getFullYear();
        bidim.mes = date.getMonth() + 1;
        bidim.dia = date.getDate();
        bidim.pedidos = numeroDePedidos[i];
        ordersData.push(bidim);
    }
    console.log(ordersData);


    //SCHEDULES
    const schedules = await Schedule.find({}).lean();
    //creamos un array con todas las fechas de schedules
    var fechasSchedules = [];
    for (let i = 0; i < schedules.length; i++) {
        date = new Date(schedules[i]['date']);
        fechasSchedules.push((date.getMonth() + 1) + "," + date.getDate() + "," + date.getFullYear());
    }
    //quitamos las fechas repetidas y creamos un array con la cantidad de dinero pagada por dia
    var cantidadDeDinero = [];
    var dinero;
    for (let i = 0; i < fechasSchedules.length; i++) {
        dinero = schedules[i]['amount'];
        while (fechasSchedules.indexOf(fechasSchedules[i]) !== fechasSchedules.lastIndexOf(fechasSchedules[i])) {
            dinero += schedules[fechasSchedules.lastIndexOf(fechasSchedules[i])]['amount'];
            fechasSchedules.splice(fechasSchedules.lastIndexOf(fechasSchedules[i]), 1);
        }
        cantidadDeDinero.push(dinero);
    }
    
    var schedulesData = [];
    for (let i = 0; i < fechasSchedules.length; i++) {
        let bidim = {};
        let date = new Date(fechasSchedules[i]);
        bidim.anio = date.getFullYear();
        bidim.mes = date.getMonth() + 1;
        bidim.dia = date.getDate();
        bidim.dinero = cantidadDeDinero[i];
        schedulesData.push(bidim);
    }
    console.log(schedulesData);

    res.render("admin/charts", {
        ordersData,
        schedulesData
    });
};

module.exports = chartsCtrl;