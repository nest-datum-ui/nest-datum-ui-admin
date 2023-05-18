import styled from 'styled-components';
import TableRow from 'components/Table/Row';

const Wrapper = styled(TableRow)`
    && .MuiTypography-root {
        align-items: center;
        display: flex;

        .MuiBox-root{
            width: fit-content;
            height: auto;
            align-items: center;
            display: flex;
        }
        svg {
            padding-right: 15px;
            padding-left: 7px;
            height: 30px!important;
        }
    }
`;

export default Wrapper;