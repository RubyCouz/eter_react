import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FormLogTab from "./FormLogTab/FormLogTab";
import { useHistory } from "react-router-dom";
import  { ModalContext } from "./ModalContext"
// import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    let history = useHistory();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        history.goBack()
    }

    return (
        <div>
            <ModalContext.Provider value={{handleClose:handleClose}}>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={ handleClose }
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <FormLogTab/>
                </Dialog>
            </ModalContext.Provider>
        </div>
    );
}
