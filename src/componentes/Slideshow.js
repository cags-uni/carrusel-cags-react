import React, {useRef, useEffect, useCallback} from 'react';
import {ReactComponent as FlechaIzquierda} from './../img/iconmonstr-angel-left-thin.svg';
import {ReactComponent as FlechaDerecha} from './../img/iconmonstr-angel-right-thin.svg';
import styled from 'styled-components';

const Slideshow = ({
		children,
		controles = false,
		autoplay = false,
		velocidad="500",
		intervalo="5000"
	}) => {
	const slideshow = useRef(null);
	const intervaloSlideshow = useRef(null);

	const posicionarSlides = () => {
		slideshow.current.children[0].style.left = '50px';
		slideshow.current.children[0].style.zIndex = '7';
		slideshow.current.children[1].style.left = '150px';
		slideshow.current.children[1].style.zIndex = '8';
		slideshow.current.children[2].style.left = '250px';
		slideshow.current.children[2].style.zIndex = '10';
		slideshow.current.children[3].style.left = '350px';
		slideshow.current.children[3].style.zIndex = '8';			
		slideshow.current.children[4].style.left = '450px';
		slideshow.current.children[4].style.zIndex = '7';			
		
		slideshow.current.children[0].style.transform = `translateY(100px)`;
		slideshow.current.children[4].style.transform = `translateY(100px)`;
		slideshow.current.style.transition = `3000ms ease-out all`;
		slideshow.current.children[2].style.transform = `translateY(-100px)`;
		//slideshow.current.style.transition = `none`;
	}

	const siguiente = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0){

			slideshow.current.children[0].style.transform = `translateY(0)`;
			slideshow.current.children[2].style.transform = `translateY(0)`;
			slideshow.current.children[4].style.transform = `translateY(0)`;

			// Obtenemos el primer elemento del slideshow y lo agregamos al final.
			const primerElemento = slideshow.current.children[0];
			slideshow.current.appendChild(primerElemento);

			// Quitamos la transición y movemos el slideshow
			//slideshow.current.style.transition = 'none';
			slideshow.current.style.transform = `translateX(200px)`;

			posicionarSlides();

			setTimeout(() => {
				//slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;			
			}, 30);

		}
	}, []);

	const anterior = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0) {

			slideshow.current.children[0].style.transform = `translateY(0)`;
			slideshow.current.children[2].style.transform = `translateY(0)`;
			slideshow.current.children[4].style.transform = `translateY(0)`;

			// Obtenemos el ultimo elemento del slideshow y lo agregamos al inicio.
			const index = slideshow.current.children.length - 1;
			const ultimoElemento = slideshow.current.children[index];
			slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
			
			// Movemos el slideshow
			slideshow.current.style.transform = `translateX(-200px)`;
		
			posicionarSlides();

			setTimeout(() => {
				slideshow.current.style.transform = `translateX(0)`;
			}, 30);

		}
	}, [])

	const handleClick =	useCallback((event) => {
			if (event.target === slideshow.current.children[1].querySelector("img")) {
				anterior()
			}
			else if (event.target === slideshow.current.children[3].querySelector("img")) {
				siguiente()
			}
		  }, [anterior, siguiente] )

	useEffect(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0) {
			posicionarSlides();
			slideshow.current.addEventListener('click', handleClick);
		}
	}, [handleClick])
	
	useEffect(() => {
		if(autoplay){
			intervaloSlideshow.current = setInterval(() => {
				siguiente();
			}, intervalo);
	
			// Eliminamos los intervalos
			slideshow.current.addEventListener('mouseenter', () => {
				clearInterval(intervaloSlideshow.current);
			});
	
			// Volvemos a poner el intervalo cuando saquen el cursor del slideshow
			slideshow.current.addEventListener('mouseleave', () => {
				intervaloSlideshow.current = setInterval(() => {
					siguiente();
				}, intervalo);
			});
		}
	}, [autoplay, intervalo, siguiente]);

	return (
		<ContenedorPrincipal>
			<ContenedorSlideshow ref={slideshow}>
				{children}
			</ContenedorSlideshow>
			{controles && <Controles>
				<Boton onClick={anterior}>
					<FlechaIzquierda />
				</Boton>
				<Boton derecho="true" onClick={siguiente}>
					<FlechaDerecha />
				</Boton>
			</Controles>}
		</ContenedorPrincipal>
	);
}

const ContenedorPrincipal = styled.div`
	position: relative;
`;

const ContenedorSlideshow = styled.div`
	display: flex;
	flex-wrap: nowrap;
	position: inherit;
	left: -250px;
`;

const Slide = styled.div`
	min-width: 100%;
	overflow: hidden;
	transition: .3s ease all;
	z-index: 10;
	position: absolute;
	top: 100px;
	// opacity: 0.5;

	img {
		width: 100%;
		vertical-align: top;
		margin: 0;
	}
`;

const Controles = styled.div`
	position: absolute;
	top: 0;
	z-index: 20;
	width: 800px;
	height: 100%;
	pointer-events: none;
	margin: 0;
`;

const Boton = styled.button`
	pointer-events: all;
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	width: 50px;
	height: 50px;
	text-align: center;
	position: absolute;
	transition: .3s ease all;
	&:hover {
		// background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
	} 

	path {
		filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
	}

	${props => props.derecho ? 'right: 0' : 'left: 0'};
`;
 
/* const TextoSlide = styled.div`
	background: ${props => props.colorFondo ? props.colorFondo : 'rgba(0,0,0,.3)'};
	color: ${props => props.colorTexto ? props.colorTexto : '#fff'};
	width: 100%;
	padding: 10px 60px;
	text-align: center;
	position: absolute;
	bottom: 0;

	@media screen and (max-width: 700px) {
		position: relative;
		background: #000;
	}
`; */

export {Slideshow, Slide};