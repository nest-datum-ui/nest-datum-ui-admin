import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormRegion from '../../../components/Form/Region';

let Form = () => {
	return <ContextRoute.Provider value="countriesRegionForm">
		<PaperForm>
			<FormRegion />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
