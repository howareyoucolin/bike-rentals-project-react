import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';	
import './scss/cart.scss';

//Component App
class Cart extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	getBiketypeRow(){
		const {products} = this.props;
		const {biketype} = this.props.formData;
		if(biketype == -1){
			return(
				<div className="unit unit-error">Please select a bike type!</div>
			);
		}
		else{
			let product = {};
			for(let key in products) {
				if(biketype == products[key].id){
					product = products[key];
					break;
				}
			}
			const {image,name,price} = product;
			return(
				<div className="unit">
					<img src={image} /> 
					<p>Name: {name}</p>
					<p>Price: ${price}</p>
					<div className="clr"></div>
				</div>
			);
		}
	}
	
	getAccessoryRow(){
		const {products} = this.props;
		const {accessory} = this.props.formData;
		if(accessory == -1){
			return(
				<div className="unit unit-error">Please select a accessory type!</div>
			);
		}
		else{
			let product = {};
			for(let key in products) {
				if(accessory == products[key].id){
					product = products[key];
					break;
				}
			}
			const {image,name,price} = product;
			return(
				<div className="unit">
					<img src={image} /> 
					<p>Name: {name}</p>
					<p>Price: ${price}</p>
					<div className="clr"></div>
				</div>
			);
		}
	}
	
	getInsuranceRow(){
		const {products} = this.props;
		const {insurance} = this.props.formData;
		if(insurance == -1){
			return(
				<div className="unit unit-error">Please select a insurance!</div>
			);
		}else if(insurance == 0){
			return(
				<div className="unit">No insurance.</div>
			);			
		}
		else{
			let product = {};
			for(let key in products) {
				if(insurance == products[key].id){
					product = products[key];
					break;
				}
			}
			const {image,name,price} = product;
			return(
				<div className="unit">
					<img src={image} /> 
					<p>Name: {name}</p>
					<p>Price: ${price}</p>
					<div className="clr"></div>
				</div>
			);
		}
	}
	
	getTotal(){
		let total = 0;
		const {products} = this.props;
		const {biketype} = this.props.formData;
		const {accessory} = this.props.formData;
		const {insurance} = this.props.formData;
		for(let key in products) {
			if((products[key].id == biketype || products[key].id == accessory || (insurance != 0 && products[key].id == insurance )) ){
				total += parseFloat(products[key].price);
			}
		}
		total = total.toFixed(2);
		return(
			<div className="total">Total: {total}</div>
		)
	}
	
	render() {
		
		const row1 = this.getBiketypeRow();
		const row2 = this.getAccessoryRow();
		const row3 = this.getInsuranceRow();
		const totalRow = this.getTotal();
		
		//Render Cart
		return(
			<div className="cartWrap">
			
				{row1}
				{row2}
				{row3}
				
				{totalRow}
			</div>
		)
	}
	
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		formData: state.formData,
	};
}

export default connect(mapStateToProps,null)(Cart);