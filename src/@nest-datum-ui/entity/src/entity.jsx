import React from 'react';
import { Entity as EntityDefault } from '@nest-datum/entity'; 
import EntityWrapper from './EntityWrapper.jsx';

export const Context = React.createContext();

export class Entity extends EntityDefault {
	constructor(EntityComponent) {
		super();
		this.EntityComponent = (EntityComponent = EntityComponent ?? React.Fragment);
		this.EntityComponentWrapper = React.memo(({
			ContextCurrent,
			children,
			...props
		}) => {
			const [ updater, setUpdater ] = React.useState(() => 0);

			this['_updater'] = () => setUpdater((currentState) => (currentState + 1));

			return <EntityWrapper
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
					ContextCurrent={Context}
					updater={updater}>
					{children}
				</EntityComponent>
			</EntityWrapper>;
		});

		this.EntityComponentWrapper.defaultProps = {
			instanceName: this.constructor.name,
		};
		this.EntityComponentWrapper.propTypes = {
		};
	}

	columnsInstance() {
		const columns = super.columnsInstance();
		const columnsKeys = Object.keys(columns);
		const output = {};
		let i = 0;

		while (i < columnsKeys.length) {
			if (columnsKeys[i] !== 'EntityComponent'
				&& columnsKeys[i] !== 'EntityComponentWrapper') {
				output[columnsKeys[i]] = columns[columnsKeys[i]];
			}
			i++;
		}
		return output;
	}

	static Renderer(callback = () => {}) {
		let Renderer = (props) => {
			const [ Component, setComponent ] = React.useState(() => null);

			React.useEffect(() => {
				setComponent(callback());
			}, [
				setComponent,
			]);

			return Component && <Component { ...props } />;
		};

		Renderer = React.memo(Renderer);
		Renderer.defaultProps = {
		};
		Renderer.propTypes = {
		};

		return Renderer;
	}
}
