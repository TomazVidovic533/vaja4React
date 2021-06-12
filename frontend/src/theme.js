import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#a6bd40',
        },
        secondary: {
            main: '#f6f6f6',
        }
    },
});

export default theme;