import React from 'react';
import {Slideshow, Slide} from './componentes/Slideshow'
import './estilos.css';
// import styled from 'styled-components';
import img1 from './img/erik-mclean-AU7WQdbQTdU-unsplash.jpg';
import img2 from './img/luke-miller-p9uN_1sNyTM-unsplash.jpg';
import img3 from './img/wolfgang-hasselmann-rEqSmgQZLyo-unsplash.jpg';
import img4 from './img/samsung-memory-Tnm-287tzHQ-unsplash.jpg';
import img5 from './img/tomas-malik-aYexhrMKWDc-unsplash.jpg';
// import img6 from './img/maeva-vigier-vhknExyycpo-unsplash.jpg';

const App = () => {
	return (
		<main>
			<Slideshow controles={true} autoplay={false} velocidad="3000" intervalo="5000">
        		<Slide>
					<button type="button">
						<img src={img1} alt=""/>
					</button>
				</Slide>
				<Slide>
					<button type="button">
						<img src={img2} alt=""/>
					</button>
				</Slide>
				<Slide>
					<button type="button">
						<img src={img3} alt=""/>
					</button>
				</Slide>
				<Slide>
					<button type="button">
						<img src={img4} alt=""/>
					</button>
				</Slide>
				<Slide>
					<button type="button">
						<img src={img5} alt=""/>
					</button>
				</Slide>
{/* 				<Slide>
					<button type="button">
						<img src={img6} alt=""/>
					</button>
				</Slide> */}
			</Slideshow>

{/* 			<Titulo>Productos Destacados</Titulo>
			<Slideshow controles={true} autoplay={true} velocidad="3000" intervalo="5000">
				<Slide>
					<a href="https://www.falconmaters.com">
						<img src={img1} alt=""/>
					</a>
					<TextoSlide colorFondo="navy">
						<p>15% descuento en productos Apple</p>
					</TextoSlide>
				</Slide>
				<Slide>
					<a href="https://www.falconmaters.com">
						<img src={img2} alt=""/>
					</a>
					<TextoSlide>
						<p>15% descuento en productos Apple</p>
					</TextoSlide>
				</Slide>
			</Slideshow> */}
		</main>
	);
}

/* const Titulo = styled.p`
	font-size: 18px;
	font-weight: 700;
	text-transform: uppercase;
	margin-bottom: 10px;
`; */
 
export default App;
