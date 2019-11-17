import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

const options = [{value: 'AB', label: 'AB'},{value: 'AK', label: 'AK'},
 {value: 'AL', label: 'AL'},{value: 'AR', label: 'AR'},
 {value: 'AZ', label: 'AZ'},{value: 'BAS', label: 'BAS'},
 {value: 'BC', label: 'BC'},{value: 'CA', label: 'CA'},
 {value: 'CON', label: 'CON'},{value: 'CT', label: 'CT'},
 {value: 'DOW', label: 'DOW'},{value: 'DUR', label: 'DUR'},
 {value: 'FL', label: 'FL'},{value: 'GA', label: 'GA'},
 {value: 'IL', label: 'IL'},{value: 'NC', label: 'NC'},
 {value: 'NE', label: 'NE'},{value: 'NJ', label: 'NJ'},
 {value: 'NM', label: 'NM'},{value: 'NV', label: 'NV'},
 {value: 'NY', label: 'NY'},{value: 'OH', label: 'OH'},
 {value: 'ON', label: 'ON'},{value: 'PA', label: 'PA'},
 {value: 'QC', label: 'QC'},{value: 'SC', label: 'SC'},
 {value: 'TN', label: 'TN'},{value: 'TX', label: 'TX'},
 {value: 'UT', label: 'UT'},{value: 'VA', label: 'VA'},
 {value: 'VT', label: 'VT'},{value: 'WA', label: 'WA'},
 {value: 'WI', label: 'WI'},{value: 'XGL', label: 'XGL'},
 {value: 'XGM', label: 'XGM'},{value: 'XWY', label: 'XWY'}];

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            city: '',
            state: 'GA',
            file: null,
            imagePreviewUrl: '',
        }
    }

  _handleImageChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];
  reader.onloadend = () => {
    this.setState({
      file: file,
      imagePreviewUrl: reader.result
    });
  }
  reader.readAsDataURL(file)
}

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`City: ${this.state.city}`);
        console.log(`State: ${this.state.state}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const data = new FormData()
        data.append('file', this.state.file)
        axios.post("http://localhost:8000/upload", data, {
          // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
          console.log(res.statusText)
        })

        this.setState({
            city: '',
            state: '',
            file: null,
            imagePreviewUrl: '',
        })
    }

    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">No file chosen</div>);
      }
        return (
            <div style={{marginTop: 10}}>
                <h3>Upload your Image</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Label: </label>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Food"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Food</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Drink"
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Drink</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="Inside"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Inside</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="Outside"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Outside</label>
                        </div>
                    </div>

                    <div className="form-group">
                      <label>State: </label>
                      <Select options = {options} />
                    </div>

                    <div className="form-group">
                      <label>City: </label>
                      <Select options = {options} />
                    </div>

                    <div className="previewComponent">
                      <label>Image: </label>
                      <input className="fileInput"
                            type="file"
                            onChange={(e)=>this._handleImageChange(e)} />
                      <div className="imgPreview">{$imagePreview}</div>
                      </div>
                    <div className="form-group">
                        <input type="submit" value="Upload"
                              className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
