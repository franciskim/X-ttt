import React, {Component} from 'react'

export default class SetName extends Component {

	constructor (props) {
		super(props)

		this.state = {}
	}

//	------------------------	------------------------	------------------------

	render () {
		return (
			<div id='SetName'>

				<h1>Set Name</h1>

				<form onSubmit={this.saveName.bind(this)}>
				<div ref='nameHolder' className='input_holder left'>
					<label>Name </label>
					<input autoFocus ref='name' type='text' className='input name' placeholder='Name' />
				</div>


				<button type='submit' className='button'><span>SAVE <span className='fa fa-caret-right'></span></span></button>
				</form>

			</div>
		)
	}

//	------------------------	------------------------	------------------------

	saveName (e) {
		// const { name } = this.refs
		// const { onSetName } = this.props
		// onSetName(name.value.trim())

		this.props.onSetName(this.refs.name.value.trim())
	}

}
