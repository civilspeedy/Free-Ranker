import './app.css';
import { LocationProvider, Route, Router } from 'preact-iso';
import Ranker from './pages/Ranker';
import About from './pages/About';

export default function App() {
    return (
        <LocationProvider>
            <Router>
                <Route path="/" component={Ranker} />
                <Route path="/about" component={About} />
            </Router>
        </LocationProvider>
    );
}
