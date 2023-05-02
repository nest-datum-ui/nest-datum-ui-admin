import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormTag from '../../../components/Form/Tag';

let Form = () => {
	return <ContextRoute.Provider value="jobsTagForm">
		<PaperForm>
			<FormTag />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
