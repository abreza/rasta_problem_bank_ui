import { createMuiTheme } from '@material-ui/core';

import { variables } from './MuiVariables';
import theme from './theme';
import typography from './typography';

const ZeroJourneyMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme(variables),
  typography
});

export default ZeroJourneyMuiTheme;
