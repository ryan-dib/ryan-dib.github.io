import './App.css';
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import About from "./components/About"
import Blog from "./components/Blog"
import BlogDetail from "./components/BlogDetail"
import {BrowserRouter as Router,Route} from "react-router-dom";
import LoginPage from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import RegisterPage from './components/RegisterPage';

 

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Route path="/" exact component={Home}></Route>
        <Route path="/contact"  component={Contact}></Route>
        <Route path="/about"  component={About}></Route>
        <Route path="/blog" exact component={Blog}></Route>
        <Route path="/blog/:id"  component={BlogDetail}></Route>
        <Route path="/flat/:slug"  component={FlatDetail}></Route>
        <Route path="/login" exact component= {LoginPage}></Route>
        <Route path="/forgot-password" exact component={ForgotPassword}></Route>
        <Route path="/register" exact component={RegisterPage}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
