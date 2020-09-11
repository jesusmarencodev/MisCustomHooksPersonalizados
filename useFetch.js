import { useState, useEffect, useRef } from "react"

export const useFetch = (url) => {
	
	const isMouted = useRef(true);//me dice que se monto el componente
	const [state, setState] = useState({ data : null,	loading : true,	error: null	});
	
	useEffect(() => {
		return () => {
			//le digo que desmoste el componente esto lo hago por si alguna peticion asincrona aun no desponde despues
			//de desmosntar el componente, con esto se elimina dicha peticion
			isMouted.current = false;
		}
	}, [])



	useEffect(() => {
		setState({ data : null,	loading : true,	error: null	});

		fetch(url)
			.then( resp => resp.json())
			.then( data => {			
				if(isMouted.current) {
					setState({
						loading : false,
						error : null,
						data : data
					});
				}
			});
	}, [url])


	return state;
}
