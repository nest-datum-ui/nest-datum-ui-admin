import React from 'react';
import { Entity as EntityDefault } from '@nest-datum/entity'; 
import EntityWrapper from './EntityWrapper.jsx';

export const Context = React.createContext();

export class Entity extends EntityDefault {
	constructor(EntityComponent = React.Fragment) {
		super();
		this.EntityComponent = EntityComponent;
		this.EntityComponentWrapper = React.memo(({
			ContextCurrent,
			children,
			...props
		}) => <EntityWrapper
			{ ...props } 
			entityInstance={super.entityInstance.bind(this)}
			serviceInstance={super.serviceInstance.bind(this)}
			controllerInstance={super.controllerInstance.bind(this)}
			columnsInstance={super.columnsInstance.bind(this)}
			ContextParent={ContextCurrent}
			ContextCurrent={Context}>
			<EntityComponent
				{ ...props } 
				entityInstance={super.entityInstance.bind(this)}
				serviceInstance={super.serviceInstance.bind(this)}
				controllerInstance={super.controllerInstance.bind(this)}
				columnsInstance={super.columnsInstance.bind(this)}
				ContextParent={ContextCurrent}
				ContextCurrent={Context}>
				{children}
			</EntityComponent>
		</EntityWrapper>);
	}
}
