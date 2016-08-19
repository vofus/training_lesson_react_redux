import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class MainLayout extends Component {
	// Метод переключения вкладок
	changeTab(event) {
		let target = event.target,
			self = this;

		while (target.tagName !== 'UL') {
			if (target.tagName === 'LI') {
				toggleActive(target);
				return;
			}
			target = target.parentNode;
		}
		function toggleActive(node) {
			let tabs = node.parentElement.children;
			tabs = Array.prototype.slice.call(tabs);
			tabs.forEach((item) => {
				if (item.classList.contains('active')) item.classList.remove('active');
				return;
			});
			node.classList.add('active');
		}
	}
	render() {
		let { color } = this.props,
			style = { color: color };

		return (
			<div className="container">
				<ul className="nav nav-tabs color-picker__nav" onClick={ this.changeTab.bind(this) }>
					<li role="presentation" className="active">
						<Link to="/color-picker">Color Picker</Link>
					</li>
					<li role="presentation">
						<Link to="/text">Text</Link>
					</li>
					<li role="presentation">
						<Link to="/photos-by-color">Photos by color</Link>
					</li>
					<span className="color-name" style={ style }>Current color: <span>{ this.props.colorName }</span></span>
				</ul>
				<div>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		color: state.color,
		colorName: state.colorName
	};
}

export default connect(mapStateToProps)(MainLayout);