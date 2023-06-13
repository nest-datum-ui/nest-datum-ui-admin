import React from 'react';
import ContextProvider from './Context.jsx';
import { EntityService } from '@nest-datum/entity';

export let Context = React.createContext();

export class ContextService extends EntityService {
	static memo(Component, Service = null, properties = {}) {
		const propertiesMemo = async () => properties;

		return (instanceProperties) => <ContextProvider 
			{ ...instanceProperties } 
			ContextParent={(properties['ContextParent'] || instanceProperties['ContextParent'])
				? (properties['ContextParent'] || instanceProperties['ContextParent'])
				: Context}
			ContextCurrent={Context}
			Service={Service} 
			Component={Component}
			properties={propertiesMemo} />;
	}
}
