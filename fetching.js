export async function fetching(moneda = "EUR", tiempo = "latest") {
	let response;
	await fetch(`https://api.exchangeratesapi.io/${tiempo}?base=${moneda}`)
		.then((res) => res.json())
		.then((resJSON) => {
			response = resJSON;
		});
	return response;
}
