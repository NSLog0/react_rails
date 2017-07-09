import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'

export default class TimeStamp extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      current_time: '',
      gmt: '',
      local_time: '',
      iso_time: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      hr: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),
      stamp: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/v1/timestemps')
      .then(res =>
        this.setState({
          current_time: new Date(res.data.data.epoch),
          gmt: new Date(res.data.data.epoch * 1000).toGMTString(),
          local_time: new Date(res.data.data.epoch * 1000).toLocaleString(),
          iso_time: new Date(res.data.data.epoch * 1000).toISOString()
         })
      )
      .catch(err => console.log(err))
  }

  onChange = (e) => {
    this.setState({[e.target.name]: parseInt(e.target.value) || 0});

    // prevent month 0
    if(e.target.name === 'month' || e.target.name === '0') {
      if (e.target.value === 0 || e.target.value === '0') {
        this.setState({[e.target.name]: 1});
      }
    }
  }

  onConvertToUnix = (e) => {
    e.preventDefault();
    var form = {
      time: this.state.stamp
    }
    if(this.state.stamp === '') {
      alert('Unix time can\'t blank');
      return true;
    }
    axios.post('/api/v1/timestemps', {form: form})
      .then((res) => {
        this.setState({
          current_time: new Date(form.time),
          gmt: new Date(form.time * 1000).toGMTString(),
          local_time: new Date(form.time * 1000).toLocaleString(),
          iso_time: new Date(form.time * 1000).toISOString()
         })
      });
  };

  onConvertToLocal = (e) => {
    e.preventDefault();

    var _s = this.state.year.toString() + '/'
    + this.state.month.toString() + '/'
    + this.state.date.toString() + ' '
    + this.state.hr.toString() + ':'
    + this.state.min.toString() + ':'
    + this.state.sec.toString() + ':';

    var _t = Math.floor(new Date(_s) / 1000)
    var form = {
      time: _t
    }

    axios.post('/api/v1/timestemps', {form: form})
      .then((res) => {
        this.setState({
          current_time: new Date(form.time),
          gmt: new Date(form.time * 1000).toGMTString(),
          local_time: new Date(form.time * 1000).toLocaleString(),
          iso_time: new Date(form.time * 1000).toISOString()
         })
      });
  };

  render() {
    return (
     <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <h2 className="card-header"> The Current Unix Timestamp </h2>
            <hr />
            <h3>
            {Math.floor(this.state.current_time)}
            </h3>

            <p>
              GMT: {this.state.gmt}
            </p>
            <p>
              Local Time: {this.state.local_time}
            </p>

            <p>
              ISO 8601: {this.state.iso_time}
            </p>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <h2 className="card-header"> Timestamp Converter </h2>
            <hr />
            <h5> Date&Time </h5>
            <form className="form-inline" onSubmit={this.onSubmit}>
              <div className="row clearfix">
                <div className="form-group col-xs-2 col-md-2">
                  <label> Year </label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    value={this.state.year}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>

                <div className="form-group col-xs-2 col-md-2">
                  <label> Month </label>
                  <input
                    id="month"
                    name="month"
                    type="text"
                    value={this.state.month}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>

                <div className="form-group col-xs-2 col-md-2">
                  <label> Date </label>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    value={this.state.date}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>

                <div className="form-group col-xs-2 col-md-2">
                  <label> Hr </label>
                  <input
                    id="hr"
                    name="hr"
                    type="text"
                    value={this.state.hr}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>

                <div className="form-group col-xs-2 col-md-2">
                  <label> Min </label>
                  <input
                    id="min"
                    name="min"
                    type="text"
                    value={this.state.min}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>

                <div className="form-group col-xs-2 col-md-2">
                  <label> Sec </label>
                  <input
                    id="sec"
                    name="sec"
                    type="text"
                    value={this.state.sec}
                    className="form-control large-w custom-from"
                    onChange={this.onChange}
                   />
                </div>
              </div>
              <hr />
              <h5> Timestamp </h5>
              <div className="row">
                <div className="form-group col-xs-6 col-md-6">
                  <input
                    id="stamp"
                    name="stamp"
                    type="text"
                    value={this.state.stamp}
                    placeholder="1499603239182"
                    className="form-control custom-from"
                    onChange={this.onChange}
                   />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="pull-right">
                <button className="btn btn-primary custom-btn" type="button" onClick={this.onConvertToUnix}>Convert Unix to Local Time</button>
                <button className="btn btn-primary custom-btn" type="button" onClick={this.onConvertToLocal}>Convert Local Time to Unix</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
