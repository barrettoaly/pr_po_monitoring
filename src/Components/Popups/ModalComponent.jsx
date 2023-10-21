import { Modal, Box, Fade, Button } from "@mui/material";
import { Userapproval } from "../ModalContents/Userapproval";
import { AddEForm } from "../ModalContents/AddEForm";

//Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: 50,
        backgroundColor: color.secondary.lightGray,
        // opacity: 0.3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    ></div>
  );
};

function ModalComponent({
  open,
  onClose,
  id,
  usedType,
  selectedIDS,
  selectedRows,
  divider,
  setShow,
  setSeverity,
  setAlertmessage,
  width,
  height,
  setFetch,
}) {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
              maxWidth: 1000,
              overflowY: "scroll",
              height: 700,
            }}
          >
            {usedType == "UserApprove" ? (
              <Userapproval
                onClose={onClose}
                selectedIDS={selectedIDS}
                selectedRows={selectedRows}
                divider={divider}
                setShow={setShow}
                setSeverity={setSeverity}
                setAlertmessage={setAlertmessage}
              />
            ) : usedType == "AddForm" ? (
              <AddEForm onClose={onClose} setFetch={setFetch} />
            ) : (
              ""
            )}
            {usedType == "viewPR" ? (
              <>
                <Box align="right" mb={2}>
                  <Button onClick={onClose} variant="contained" color="info">
                    Close
                  </Button>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalComponent;
