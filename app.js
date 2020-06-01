
import {establecerFecha, mostrarListaMonedas, pedirCotizaciones} from "./ui.js";

import {fetching} from "./fetching.js";

async function inicializar() {
	establecerFecha();
	await mostrarListaMonedas(fetching);
	pedirCotizaciones(fetching); 
}

inicializar();
