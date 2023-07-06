import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const accessFormRelationForm = {
	id: 'cv-role-access-option-relations-form',
	storeName: 'cv-role-access-option-relations-form',
	apiUrl: 'access/:id/role',
	title: 'Role',
	post: {
		apiUrl: 'access/:id/roles',
	},
	orderInHeaderTabMenu: 2,
	fields: [{
		Component: Select,
		storeName: 'cv-role-access-option-relations-form',
		apiUrl: `${process.env.URL_API_SSO}/role`,
		name: 'roleId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId, relationsData) => ((relationsData || []).data || []).length > 0
			? ({ id: [ '$Not', '$In', ...(relationsData || []).data.map((item) => item.roleId) ] })
			: ({}),
		check: [ utilsCheckStrId ]
	}],
};

export default accessFormRelationForm;
