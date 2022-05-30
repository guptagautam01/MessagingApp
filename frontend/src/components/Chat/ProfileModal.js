import * as React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { Modal, Box, Avatar, Container, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f2eff1F0",
  boxShadow: 24,
  p: 4,
};

const ProfileModal = ({ user, children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {children ? (
        <span onClick={handleOpen}> {children} </span>
      ) : (
        <FaceIcon onClick={handleOpen} />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Container sx={{ width: 150 }}>
            <Avatar
              src={user.pic}
              sx={{
                width: 200,
                padding: "none",
                marginLeft: "-45px",
                height: 200,
              }}
            ></Avatar>
          </Container>
          <Typography
            sx={{ width: "100%" }}
            variant="h4"
            align="center"
            color="#172544"
          >
            {user.name}
          </Typography>
          <Typography
            sx={{ width: "100%" }}
            variant="h6"
            align="center"
            color="#172544d0"
          >
            {user.email}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;
