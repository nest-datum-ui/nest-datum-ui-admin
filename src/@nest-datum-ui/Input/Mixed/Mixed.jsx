import React from 'react';
import PropTypes from 'prop-types';
import Progress from '@nest-datum-ui/Progress';

const DataTypes = {
	'happ-data-type-int': () => React.lazy(() => import('@nest-datum-ui/Input/Int')),
	'happ-data-type-float': () => React.lazy(() => import('@nest-datum-ui/Input/Float')),
	'happ-data-type-bool': () => React.lazy(() => import('@nest-datum-ui/Input/Bool')),
	'happ-data-type-text': () => React.lazy(() => import('@nest-datum-ui/Input/Text')),
	'happ-data-type-upload': () => React.lazy(() => import('@nest-datum-ui-admin-lib/files/src/components/Input/Upload')),
	'happ-data-type-file-select': () => React.lazy(() => import('@nest-datum-ui-admin-lib/files/src/components/Input/Manager')),
	'happ-data-type-select-avatar': () => React.lazy(() => import('@nest-datum-ui-admin-lib/sso/src/components/Input/Avatar')),
	'happ-data-type-file-email-view': () => React.lazy(() => import('@nest-datum-ui-admin-lib/mail/src/components/Input/View')),
	// 'happ-data-type-file-cv': () => React.lazy(() => import('@nest-datum-ui-admin-lib/cv/src/components/Input/File')),
	// 'happ-data-type-file-cv-lensa': () => React.lazy(() => import('@nest-datum-ui-admin-lib/cv-lensa/src/components/Input/File')),
};
let Mixed = ({
	storeName,
	dataTypeId,
	...props
}) => {
	const Component = React.useMemo(() => (DataTypes[dataTypeId] ?? (() => {}))(), [
		dataTypeId,
	]);

	return <React.Fragment>
		<React.Suspense fallback={<Progress visible />}>
			{Component
				? <Component { ...props } />
				: <React.Fragment />}
		</React.Suspense>
	</React.Fragment>;
};

Mixed = React.memo(Mixed);
Mixed.defaultProps = {
};
Mixed.propTypes = {
	dataTypeId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

let MixedMemo = ({
	dataTypeId,
	// defaultValue,
	...props
}) => {
	// const [ defaultValueMemo ] = React.useState(() => defaultValue);

	/*...(typeof defaultValueMemo !== 'undefined'
		&& defaultValueMemo !== null
		&& !Number.isNaN(defaultValueMemo))
		? { defaultValue: defaultValueMemo }
		: {} */

	return DataTypes[dataTypeId]
		? <Mixed 
			{ ...props } 
			dataTypeId={dataTypeId} />
		: <React.Fragment />;
};

MixedMemo = React.memo(MixedMemo);
MixedMemo.defaultProps = {
};
MixedMemo.propTypes = {
};

export default MixedMemo;
