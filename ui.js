export function establecerFecha() {
	const $fecha = document.querySelector("form").fecha;
	$fecha.valueAsDate = new Date();
	$fecha.setAttribute("max", $fecha.value);
}

export async function mostrarListaMonedas(fetching) {
	let monedas = await fetching();
	monedas = Object.keys(monedas.rates);
	monedas[monedas.length] = "EUR";
	monedas.sort();
	monedas.forEach((moneda) => {
		const $opcion = document.createElement("button");
		$opcion.setAttribute("class", "list-group-item list-group-item-action");
		$opcion.dataset.moneda = moneda;
		$opcion.innerText = moneda;
		document.querySelector(".list-group").appendChild($opcion);
	});
}

export async function pedirCotizaciones(fetching) {
	const $opciones = document.querySelectorAll(".list-group-item");
	$opciones.forEach(($opcion) => {
		$opcion.addEventListener("click", async () => {
			document.querySelector("tbody").innerHTML = "<th scope=\"row\"><p>Cargando...</p></th><td><p>Cargando...</p></td>";
			const $fecha = document.querySelector("#fecha").value;
			const monedaConFecha = await fetching($opcion.dataset.moneda, $fecha);
			if (document.querySelector(".active")) {
				document.querySelector(".active").classList.remove("active");
			}
			$opcion.classList.add("active");
			mostrarTablaCotizaciones(monedaConFecha);
		});
	});
}

export function mostrarTablaCotizaciones(data) {
	const arrayData = Object.entries(data.rates);
	const $cuerpoTabla = document.querySelector("tbody");
	arrayData.sort();
	document.querySelector("tbody").innerHTML = "";
	arrayData.forEach((cotizacion) => {
		const $fila = document.createElement("tr");
		$fila.innerHTML = `<th scope="row">${cotizacion[0]}</th><td>${cotizacion[1]}</td>`;
		$cuerpoTabla.appendChild($fila);
	});
}

