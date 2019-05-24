import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import AppForm from './form';
import Cart from './cart';

const SITE_URL = 'http://167.99.230.240:3000/';

//Component App
class App extends React.Component {
	
	componentDidMount(){
		axios.get(SITE_URL+'data/bikerentals.json').then((response) => {
			let products = response.data.products;
			this.props.updateProducts(products);
			this.props.updateAppStatus('ready');
		});
	}
	
	render() {
		const { appStatus } = this.props;
		//Loading
		if(appStatus === 'loading'){
			return (
				<div className="loading">
					<div></div>
					<div></div>
					<div></div>
				</div>
			)
		}
		//When it's ready, display app
		else if(appStatus === 'ready'){
			return (
				<div id="app" className="row">
					<div id="form" className="col-md-6"><AppForm /></div>
					<div id="cart" className="col-md-6"><Cart /></div>
				</div>
			)
		}
		//Thank you page
		else if(appStatus === 'thankyou'){
			return (
				<div id="thank-you">
					<h1>Thank you very much!</h1>
					<Cart />
				</div>
			)
		}
		
	}
};

const mapStateToProps = (state) => {
	return { appStatus: state.appStatus };
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateAppStatus:(appStatus) => {
			dispatch({type:'UPDATE_APP_STATUS', payload:appStatus});
		},
		updateProducts:(products) => {
			dispatch({type:'UPDATE_PRODUCTS', payload:products});
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

