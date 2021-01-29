import React from "react";
import styles from "./css/DataItem.scss";
import styled from "styled-components";
import { Icon, Header, Button,  Input, } from 'semantic-ui-react';
import {DropdownWithSongList as Dropdown} from './Dropdown.js';
import {withSongInfo} from './context/SongInfoContext.js';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

const CDropdown = styled(Dropdown)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 0 0 0 !important;
`;
class DataItem extends React.Component {
	constructor(props){
		super(props);
		this.state={
			dropdownSignal:false,
			visiblePlus:false,
			visibleDropdown:false,
		};
	}
	clickHandler(){
		this.props.onClick();
	}
	toggleDropdown(){
		this.setState({
			visibleDropdown: !this.state.visibleDropdown,
		});
	}
	setVisible(newVisible){
		this.setState({
			visibleDropdown:newVisible,
		});
	}
	render(){
		//console.log(`dataitem render ${this.props.key}`);
		let tail, icon;
		switch (this.props.type) {
			case 0:
				icon = (<i className={`fas fa-folder ${styles.icon}`}></i>);
				break;
			case 1:
				const plusStyle = this.state.visibleDropdown?styles.plusVisible:styles.plusHidden;
				icon = (<i className={`far fa-play-circle ${styles.icon}`}></i>);
				tail = (<div
					className={`${styles.tail}  ${plusStyle}`}
					onClick={()=>this.toggleDropdown()}>
					<i className={`fas fa-plus`}></i>
					<Dropdown
						visible={this.state.visibleDropdown}
						setVisible = {(t)=>this.setVisible(t)}
						song={this.props.song}
						/>
					</div>);
				break;

		}

		const queryParams = queryString.parse(this.props.location.search);
		let curSongHashedCode = queryParams.m?queryParams.m:''
		let colorStyle;
		if(this.props.song.HashedCode == curSongHashedCode){
			colorStyle = styles.playing;
		} else {
			colorStyle = styles.notPlaying;
		}
		return(
			<div
				className = {`${styles.container} ${colorStyle}`}>
				<div className={styles.head} onClick = {()=>this.clickHandler()}>
					{icon}
					<div className = {styles.header} >
						{this.props.song.Name}
					</div>
				</div>
				{tail}
			</div>
		);
	}
}
export const DataItemWithSongInfo = withRouter(withSongInfo(DataItem));
