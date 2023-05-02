import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormCategory from '../../../components/Form/Category';

let Form = () => {
	return <ContextRoute.Provider value="jobsCategoryForm">
		<PaperForm>
			<FormCategory />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
