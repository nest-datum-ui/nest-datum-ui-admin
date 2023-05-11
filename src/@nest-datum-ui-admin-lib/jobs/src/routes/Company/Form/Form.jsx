import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormCompany from '../../../components/Form/Company';

let Form = () => {
	return <ContextRoute.Provider value="jobsCompanyForm">
		<PaperForm>
			<FormCompany />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
