// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import PayButton from "../Buttons/PayButton";
//
// export default function AlertDialog(props:{
// 	label:string
// 	contract_id:string
// }) {
// 	const [open, setOpen] = React.useState(true);
//
//
// 	const handleClose = () => {
// 		setOpen(false);
// 	};
//
// 	return (
// 		<div>
// 			<Dialog
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="alert-dialog-title"
// 				aria-describedby="alert-dialog-description"
// 			>
// 				<DialogTitle id="alert-dialog-title">
// 					{"Payment"}
// 				</DialogTitle>
// 				<DialogContent>
// 					<DialogContentText id="alert-dialog-description">
// 						{props.label}
// 					</DialogContentText>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={handleClose}>Later</Button>
// 					<PayButton contract_id={props.contract_id}/>
// 				</DialogActions>
// 			</Dialog>
// 		</div>
// 	);
// }