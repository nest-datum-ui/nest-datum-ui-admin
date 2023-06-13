import React from 'react';
import { createRoot } from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { LayoutAuthed as SsoLayoutAuthed } from '@nest-datum-ui-admin-lib/sso';
import { LayoutLoad as HttpLayoutLoad } from '@nest-datum-ui-admin-lib/http';
import { Provider as ProviderTheme } from '@nest-datum-ui/Theme';
import { Provider as ProviderException } from '@nest-datum-ui/Exception';
import Redux from '@nest-datum-ui/redux';
import Layout from 'layout';
import LayoutLoader from 'layout-loader';
import GlobalStyles from './globalStyles.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<React.Fragment>
	<Redux>
		<ProviderTheme>
			<SnackbarProvider>
				<ProviderException>
					<SsoLayoutAuthed>
						<HttpLayoutLoad>
							<Layout>
								<LayoutLoader />
							</Layout>
						</HttpLayoutLoad>
					</SsoLayoutAuthed>
				</ProviderException>
			</SnackbarProvider>
		</ProviderTheme>
		<GlobalStyles />
	</Redux>
</React.Fragment>);
