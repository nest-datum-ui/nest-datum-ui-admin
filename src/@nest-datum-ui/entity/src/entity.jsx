import React from 'react';
import { Entity as EntityDefault } from '@nest-datum/entity'; 

export class Entity extends EntityDefault {
	constructor(EntityComponent) {
		super();
		this.EntityComponent = (EntityComponent = EntityComponent ?? React.Fragment);
		this.EntityComponentWrapper = React.memo(({
			children,
			...props
		}) => {
			const [ updater, setUpdater ] = React.useState(() => 0);
			const [ entityInstance ] = React.useState(() => super.entityInstance.bind(this));
			const [ serviceInstance ] = React.useState(() => super.serviceInstance.bind(this));
			const [ controllerInstance ] = React.useState(() => super.controllerInstance.bind(this));

			this['_updater'] = () => setUpdater((currentState) => (currentState + 1));

			return <EntityComponent
				{ ...props } 
				entityInstance={entityInstance}
				serviceInstance={serviceInstance}
				controllerInstance={controllerInstance}
				updater={updater}>
				{children}
			</EntityComponent>;
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
