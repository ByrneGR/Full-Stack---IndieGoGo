import React from "react";
import CampaignFormPt1 from './campaign_form_pt1'
import CampaignFormPt2 from './campaign_form_pt2'
import { withRouter } from 'react-router-dom'

class CampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      creator_type: "",
      location: "",
      banking_location: "",
      title: "My Campaign Title",
      description: "",
      duration: 30,
      imageFile: null,
    };
   this.nextStep = this.nextStep.bind(this); 
   this.prevStep = this.prevStep.bind(this); 
   this.handleInput = this.handleInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleFile = this.handleFile.bind(this);
  }

  // proceed to next step
  nextStep = function() {

    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  prevStep = function() {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  handleInput(type) { return e => {
    this.setState({[type]: e.currentTarget.value})
    }
  }  

  handleFile(e) {
      this.setState({imageFile: e.currentTarget.files[0]})
  
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('campaign[title]', this.state.title)
    formData.append('campaign[creator_type]', this.state.creator_type)
    formData.append('campaign[location]', this.state.location)
    formData.append('campaign[banking_location]', this.state.banking_location)
    formData.append('campaign[description]', this.state.description)
    formData.append('campaign[duration]', this.state.duration)
    formData.append('campaign[image]', this.state.imageFile)
    debugger
    this.props
      .createCampaign(formData)
      .then(() => this.props.history.push(`api/campaigns/${this.props.campaign.id}`));

    }

  render() {
    const errors = this.props.errors;
    const { step } = this.state;
    const {creator_type, location, banking_location, title, description, duration} = this.state
    const values = { creator_type, location, banking_location, title, description, duration }
    switch(step) {
      case 1:
        return (
          <CampaignFormPt1 nextStep={this.nextStep} handleInput={this.handleInput} values={values}
          />
        )
      case 2:
        return (
          <CampaignFormPt2 prevStep={this.prevStep} handleFile={this.handleFile} handleInput={this.handleInput} values={values} handleSubmit={this.handleSubmit} />
        )
    }
  }
}

export default CampaignForm;
