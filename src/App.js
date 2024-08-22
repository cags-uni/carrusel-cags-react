import React from 'react';
import {Slideshow, Slide} from './componentes/Slideshow'
import './estilos.css';
import img1 from './img/erik-mclean-AU7WQdbQTdU-unsplash.jpg';
import img2 from './img/luke-miller-p9uN_1sNyTM-unsplash.jpg';
import img3 from './img/wolfgang-hasselmann-rEqSmgQZLyo-unsplash.jpg';
import img4 from './img/samsung-memory-Tnm-287tzHQ-unsplash.jpg';
import img5 from './img/tomas-malik-aYexhrMKWDc-unsplash.jpg';
import img6 from './img/maeva-vigier-vhknExyycpo-unsplash.jpg';

const App = () => {
	return (
		<main>
			<Slideshow controles={true} >
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
				<Slide>
					<button type="button">
						<img src={img6} alt=""/>
					</button>
				</Slide>
			</Slideshow>
		</main>
	);
}

export default App;
