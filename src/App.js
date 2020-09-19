import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudSunRain, faMapMarkerAlt, faPlus, faCloudShowersHeavy, faCloudRain, faSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import { 
    Container,
    Row,
    Col
} from 'reactstrap';

import * as ROUTES from './constans/Routes'
import './assets/css/index.css';
import Logo from './assets/img/logo-small.png';

import HomeScreen from './screens/Home'

const App = () =>(
    <Router>
		<ScrollToTop>
			<div className="gradiweb">
				<div className="cabezera">
					<Container>
						<Row>
							<Col xs={12} sm={12} md={12} lg={12} className="d-flex justify-content-end">
								<img src={Logo} className="logo" />
							</Col>
						</Row>
					</Container>
				</div>
				<Route exact path={ROUTES.HOME} component={HomeScreen} />
			</div>
		</ScrollToTop>
    </Router>
)
library.add(faMapMarkerAlt, faCloudSunRain, faPlus, faCloudShowersHeavy, faCloudRain, faSun, faCloud)
export default App;
