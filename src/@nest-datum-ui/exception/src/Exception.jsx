import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ExceptionService } from './exception.service.js';
import { ExceptionController } from './exception.controller.js';
import { ExceptionEntity } from './exception.entity.js';

let Exception = ({ children }) => {
	return <SnackbarProvider>
		{children}
	</SnackbarProvider>;
};

Exception = React.memo(Exception);
Exception.defaultProps = {
};
Exception.propTypes = {
};

export default ExceptionEntity.Renderer(() => new ExceptionController(new ExceptionService(new ExceptionEntity(Exception))));
