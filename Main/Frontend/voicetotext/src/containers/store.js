import throttle from 'lodash.throttle';

	const persistedState = loadState();
	const store = createStore(
	app,
	persistedState
	);
	store.subscribe(() => {
		saveState({
			todos: store.getState().todos
		});
	}, 1000));