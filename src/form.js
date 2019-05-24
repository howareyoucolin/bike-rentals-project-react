import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';	
import './scss/form.scss';

//Component App
class AppForm extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	biketypeHandler(props){
		const value = event.target.value;
		props.updateFormData('biketype',value);
	}
	
	accessoryHandler(props){
		const value = event.target.value;
		props.updateFormData('accessory',value);
	}
	
	insuranceHandler(props){
		const value = event.target.value;
		props.updateFormData('insurance',value);
	}
	
	submitHandler(props){
		this.props.updateAppStatus('thankyou');
	}
	
	getBikeSelect(){
		const {products,formData} = this.props;
		const list = products.map(item => {
			if(item.product_type === 'bike'){
				return(
					<option key={item.product_type+item.id} value={item.id}>{item.name}(${item.price})</option>
				);
			}
		});
		return (
			<select onChange={() => this.biketypeHandler(this.props)}>
				<option value="-1">Please select</option>
				{ list }
			</select>
		);
	}
	
	getAccessorySelect(){
		const {products,formData} = this.props;
		const list = products.map(item => {
			if(item.product_type === 'accessory'){
				return(
					<option key={item.product_type+item.id} value={item.id}>{item.name}(${item.price})</option>
				);
			}
		});
		return (
			<select onChange={() => this.accessoryHandler(this.props)}>
				<option value="-1">Please select</option>
				{ list }
			</select>
		);
	}
	
	getInsuranceSelect(){
		const {products,formData} = this.props;
		const list = products.map(item => {
			if(item.product_type === 'addon'){
				return(
					<option key={item.product_type+item.id} value={item.id}>{item.name}(${item.price})</option>
				);
			}
		});
		return (
			<select onChange={() => this.insuranceHandler(this.props)}>
				<option value="-1">Please select</option>
				{ list }
				<option value="0">No insurance</option>
			</select>
		);
	}
	
	getSubmitButton(){
		const {formData} = this.props;
		const disabled = (formData.biketype == -1 || formData.accessory == -1 || formData.insurance == -1);
		return(
			<button className="btn btn-primary" disabled={disabled} onClick={() => this.submitHandler(this.props)} >Submit</button>
		);
	}
	
	render() {
		
		const biketype_options = this.getBikeSelect();
		const accessory_options = this.getAccessorySelect();
		const insurance_options = this.getInsuranceSelect();
		const submit_button = this.getSubmitButton();
		
		//Render AppForm
		return(
			<div className="form-wrap">
				<label>Bike Type</label>
				{biketype_options}
				
				<label>accessory</label>
				{accessory_options}
				
				<label>Insurance</label>
				{insurance_options}
				
				{submit_button}
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

const mapDispatchToProps = (dispatch) => {
	return {
		updateFormData:(key,value) => {
			dispatch({type:'UPDATE_FORM_DATA', payload:{key:key,value:value}});
		},
		updateAppStatus:(appStatus) => {
			dispatch({type:'UPDATE_APP_STATUS', payload:appStatus});
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(AppForm);