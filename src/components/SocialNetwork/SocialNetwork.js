import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
// css
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // Style de base du composant
        root: {
            // height: 400,
            transform: 'translateZ(0px)',
            flexGrow: 1,
            position: 'fixed',
            bottom: '1em',
            right: '1em',
        },
        speedDial: {
            // position: 'fixed',
            // bottom: theme.spacing(0),
            //  right: theme.spacing(0),
        },
    }),
);
// tableau icone + intitulé
const actions = [
    {icon: <FileCopyIcon/>, name: 'Copy'},
    {icon: <SaveIcon/>, name: 'Save'},
    {icon: <PrintIcon/>, name: 'Print'},
    {icon: <ShareIcon/>, name: 'Share'},
    {icon: <FavoriteIcon/>, name: 'Like'},
];

export default function OpenIconSpeedDial() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={'up'}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
