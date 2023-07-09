import React from 'react';

let RouteNotFound = () => {
	return <React.Fragment>
		RouteNotFound
	</React.Fragment>;
};

RouteNotFound = React.memo(RouteNotFound);
RouteNotFound.defaultProps = {
};
RouteNotFound.propTypes = {
};

export default RouteNotFound;
