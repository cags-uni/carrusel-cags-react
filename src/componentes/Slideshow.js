import React, {useRef, useEffect, useCallback} from 'react';
import {ReactComponent as FlechaIzquierda} from './../img/iconmonstr-angel-left-thin.svg';
import {ReactComponent as FlechaDerecha} from './../img/iconmonstr-angel-right-thin.svg';
import styled from 'styled-components';

const Slideshow = ({
		children,
		controles = false
	}) => {
	const slideshow = useRef(null);

	const posicionarSlides = () => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0){

			slideshow.current.children[0].style.left = '50px';
			slideshow.current.children[0].style.top = '200px';
			slideshow.current.children[0].style.zIndex = '7';
			slideshow.current.children[1].style.left = '150px';
			slideshow.current.children[1].style.top = '100px';
			slideshow.current.children[1].style.zIndex = '8';
			slideshow.current.children[2].style.left = '250px';
			slideshow.current.children[2].style.top = '0';
			slideshow.current.children[2].style.zIndex = '10';
			slideshow.current.children[3].style.left = '350px';
			slideshow.current.children[3].style.top = '100px';
			slideshow.current.children[3].style.zIndex = '8';			
			slideshow.current.children[4].style.left = '450px';
			slideshow.current.children[4].style.top = '200px';
			slideshow.current.children[4].style.zIndex = '7';
			
			if(slideshow.current.children.length > 5){
				for (let i = 0; i < slideshow.current.children.length; i++) {
					slideshow.current.children[i].style.visibility = (i < 5 ? 'visible' : 'hidden')
					if (i >= 5)
						slideshow.current.children[i].style.zIndex = '6';
				}
			}
		}
	}

 	const siguiente = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0){

			// Obtenemos el primer elemento del slideshow y lo agregamos al final.
			const primerElemento = slideshow.current.children[0];
			slideshow.current.appendChild(primerElemento);

			posicionarSlides();
		}
	}, []); 

	const anterior = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0) {

			// Obtenemos el ultimo elemento del slideshow y lo agregamos al inicio.
			const index = slideshow.current.children.length - 1;
			const ultimoElemento = slideshow.current.children[index];
			slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild);
			
			posicionarSlides();
		}
	}, [])

	const handleClick =	useCallback((event) => {
			if (event.target === slideshow.current.children[1].querySelector("img")) {
				anterior();
			}
			else if (event.target === slideshow.current.children[3].querySelector("img")) {
				siguiente();
			}
			else if (event.target === slideshow.current.children[0].querySelector("img")) {
				anterior();
				anterior();
			}
			else if (event.target === slideshow.current.children[4].querySelector("img")) {
				siguiente();
				siguiente();
			}
		  }, [anterior, siguiente] )

	useEffect(() => {
		// Efecto que se ejecuta solo una vez al cargar la página
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0) {
			posicionarSlides();
			slideshow.current.style.visibility = 'visible';
			slideshow.current.addEventListener('click', handleClick);
		}
	}, [handleClick])
	
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
	visibility: hidden;
	transition: 3000ms ease-out all;
`;

const Slide = styled.div`
	min-width: 100%;
	overflow: hidden;
	transition: .3s ease all;
	z-index: 10;
	position: absolute;

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

export {Slideshow, Slide};