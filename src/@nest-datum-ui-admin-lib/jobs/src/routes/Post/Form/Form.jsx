import React from 'react';
import { ContextRoute } from '@nest-datum-ui/Context';
import PaperForm from 'components/Paper/Form';
import FormPost from '../../../components/Form/Post';

let Form = () => {
	return <ContextRoute.Provider value="jobsPostForm">
		<PaperForm>
			<FormPost />
		</PaperForm>
	</ContextRoute.Provider>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
};

export default Form;
