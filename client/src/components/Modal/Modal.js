import React, { Component } from 'react';

import './Modal.css';

class Modal extends React.Component {

    render() {
        return (
            <div className="full">
                    <h1 id="title"> HYPERCHAT </h1>
                    <form onSubmit={this.props.updateUserHash}>
                        <label style={{textAlign:'center'}}> Enter a secret name</label>
                        <input type="password" name="userHash" class="form-control"/>
                        <button type="submit" value="Submit" className="btn btn-info btn-lg btn-block" data-toggle="modal" data-target="modalUserHash">Submit</button>
                    </form>
            </div>
        )
    }
}

export default Modal;