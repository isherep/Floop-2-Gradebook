import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class AddColumn extends Component {
  static propTypes = {
    uid: PropTypes.string,
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    }).isRequired
  }
  state = { column: '' }

  addCategory() {
    this.props.firestore.add(
      { collection: 'Databases' }, { document: 'Dev_Database' }, { collection: 'Assignments'},
      {
        Class_ID: this.props.uid,
        name: this.state.column
      }
    )
    this.setState({ column: '' })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.column}
          onChange={(evt) => this.setState({ column: evt.target.value })}
        />
        <button onClick={(evt) => this.addColumn()}>Add Column</button>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStatetoProps),
  firestoreConnect(),
)(AddColumn)
