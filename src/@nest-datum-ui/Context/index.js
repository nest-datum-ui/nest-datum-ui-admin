import React from 'react';
import ContextProps, {
	create as createAppContext,
} from './Props.jsx';
import ContextRoute, {
	create as createRouteContext,
} from './Route.jsx';
import ContextService from './Service.jsx';
import ContextList from './List.jsx';

const ContextOptions = React.createContext({});

export {
	ContextProps,
	ContextRoute,
	ContextService,
	ContextList,
	ContextOptions,
	createAppContext,
	createRouteContext,
};
