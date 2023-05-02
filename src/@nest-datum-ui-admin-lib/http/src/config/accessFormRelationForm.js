import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const accessFormRelationForm = {
	id: 'http-role-access-option-relations-form',
	storeName: 'http-role-access-option-relations-form',
	apiUrl: 'access/:id/role',
	title: 'Role',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'access/:id/roles',
	},
	fields: [{
		Component: Select,
		storeName: 'http-role-access-option-relations-form',
		apiUrl: `${process.env.URL_API_SSO}/role`,
		name: 'roleId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId, relationsData) => ((relationsData || []).data || []).length > 0
			? ({ id: [ '$Not', ...(relationsData || []).data.map((item) => item.roleId) ] })
			: ({}),
		check: [ utilsCheckStrId ]
	}],
};

export default accessFormRelationForm;
