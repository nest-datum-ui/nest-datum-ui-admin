import React from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutLoader as HttpLayoutLoader } from '@nest-datum-ui-admin-lib/http';
import { LayoutAuthed as SsoLayoutAuthed } from '@nest-datum-ui-admin-lib/sso';
import Redux from '@nest-datum-ui/redux';
import Exception from '@nest-datum-ui/exception';
import Theme from 'theme';
import Layout from 'layout';
import LayoutLoader from 'layout-loader';
import LayoutApp from 'layout-app';
import GlobalStyles from './globalStyles.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Redux>
	<Theme>
		<Exception>
			<Layout>
				<LayoutLoader>
					<HttpLayoutLoader>
						<SsoLayoutAuthed>
							<LayoutApp />
						</SsoLayoutAuthed>
					</HttpLayoutLoader>
				</LayoutLoader>
			</Layout>
		</Exception>
	</Theme>
	<GlobalStyles />
</Redux>);
