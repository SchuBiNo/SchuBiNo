import React from 'react';
import 'draft-js/dist/Draft.css';
import { nanoid } from 'nanoid';

import {
	Editor,
	EditorState,
	RichUtils,
	CompositeDecorator,
	Modifier,
	SelectionState,
} from 'draft-js';

class MyEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			currSuggestionBox: <></>,
			validating: false,
		};
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.checkTimeout = null;
		this.lastText = '';
		this.language = 'en';
		this.suggestionOffsets = [];
	}

	handleChange = (editorState) => {
		this.setState({ editorState: editorState });
		let plainText = editorState.getCurrentContent().getPlainText('\u0001');
		if (plainText.length < 1) return;
		if (plainText === this.lastText) return;
		if (this.checkTimeout) clearTimeout(this.checkTimeout);
		this.lastText = plainText;
		this.checkTimeout = setTimeout(() => this.check(plainText), 1500);
	};

	check = (text) => {
		this.setState({ validating: true });
		fetch('/api/language/check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				language: this.language,
				text: text,
				replacementCountLength: 4,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.suggestionOffsets = [];
				this.displaySuggestions(data);
				this.setState({ validating: false });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	displaySuggestions = (data) => {
		if (data.suggestions.length < 1) return; // no suggestions
		this.setState({
			editorState: EditorState.set(this.state.editorState, {
				decorator: new CompositeDecorator(
					data.suggestions.map((suggestion, _) => {
						let id = nanoid(8);
						return {
							strategy: (_, callback) => {
								let offset = 0;
								this.suggestionOffsets.forEach((o) => {
									if (o.start < suggestion.startPos) offset += o.offset;
								});
								callback(
									suggestion.startPos + offset,
									suggestion.endPos + offset
								);
							},
							component: this.Suggestion(
								suggestion.replacement,
								suggestion.message,
								id
							),
							id: id,
						};
					})
				),
			}),
		});
	};

	removeDecorator = (id, newEditorState) => {
		this.lastText = newEditorState.getCurrentContent().getPlainText('\u0001');
		let decorators = this.state.editorState.getDecorator();
		let index = decorators._decorators.findIndex(
			(decorator) => decorator.id === id
		);
		console.log(index);
		console.log(decorators._decorators.splice(index, 1));

		console.log(decorators);
		this.setState({
			editorState: EditorState.set(newEditorState, {
				decorator: new CompositeDecorator(decorators._decorators),
			}),
			currSuggestionBox: <></>,
		});
	};

	Suggestion = (replacements, message, id) => {
		return (props) => {
			this.isClicked = false;

			const suggestionBox = (clickPosition) => {
				return (
					<div
						className='card'
						style={{
							width: '18rem',
							border: '1px solid',
							borderRadius: '16px',
							position: 'absolute',
							left: clickPosition[0],
							top: clickPosition[1],
							backgroundColor: '#f5f5f5',
							zIndex: '1',
						}}>
						<div className='card-body'>
							<h5 className='card-title'>{message}</h5>
							<h6 className='card-subtitle mb-2 text-muted'>
								Possible replacements are:
							</h6>
							<p className='card-text'></p>
							{replacements.slice(0, 3).map((replacement) => {
								return (
									<>
										<button
											className='btn btn-primary card-link'
											onClick={() => {
												focus();
												this.removeDecorator(
													id,
													this.replace(props, replacement)
												);
											}}>
											{replacement}
										</button>{' '}
									</>
								);
							})}
						</div>
					</div>
				);
			};

			return (
				<>
					<a
						style={{ color: 'red' }}
						onClick={(e) => {
							this.isClicked = false;
							console.log(this.state.editorState.getDecorator()._decorators[0]);
							this.setState({
								currSuggestionBox: suggestionBox([e.clientX, e.clientY]),
							});
						}}>
						{props.children}
					</a>
				</>
			);
		};
	};

	replace = (props, replacement) => {
		let selectionState = SelectionState.createEmpty(props.blockKey).merge({
			anchorOffset: props.start,
			focusOffset: props.end,
		});
		this.suggestionOffsets.push({
			start: props.end,
			offset:
				replacement.length -
				this.state.editorState
					.getCurrentContent()
					.getPlainText()
					.slice(props.start, props.end).length,
		});

		console.log(
			'Start: ' + props.start,
			'End: ' + props.end,
			'Select leng:',
			this.state.editorState
				.getCurrentContent()
				.getPlainText()
				.slice(props.start, props.end).length
		);

		let newContentState = Modifier.replaceText(
			this.state.editorState.getCurrentContent(),
			selectionState,
			replacement
		);
		return EditorState.push(
			this.state.editorState,
			newContentState,
			'insert-characters'
		);
	};

	handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			this.handleChange(newState);
			return 'handled';
		}

		return 'not-handled';
	}

	render() {
		return (
			<>
				<form className='form-control mb-4 mt-4'>
					<div className='input-group mb-3 mt-3'>
						<div className='input-group-prepend'>
							<label
								className='input-group-text'
								htmlFor='inputGroupSelectLang'>
								Language
							</label>
						</div>
						<select
							className='language-select'
							id='inputGroupSelectLang'
							onChange={(e) => {
								this.language = e.target.value;
							}}>
							<option value='en'>English</option>
							<option value='de'>German</option>
							<option value='es'>Spanish</option>
							<option value='fr'>French</option>
							<option value='it'>Italian</option>
							<option value='nl'>Dutch</option>
							<option value='pt'>Portuguese</option>
							<option value='ru'>Russain</option>
							<option value='zh'>Chinese</option>
						</select>
					</div>
				</form>
				<div
					style={{
						border: '1px solid',
						borderRadius: '16px',
						padding: '16px',
					}}>
					<Editor
						editorState={this.state.editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.handleChange}
					/>
					{this.state.currSuggestionBox}
				</div>
				{this.state.validating && <div>Is Validating</div>}
			</>
		);
	}
}

export default MyEditor;
