import Swal from "sweetalert2";
import { PostRequest } from "../API/api";

export const handleComplete = (relid, setRefresh) => {
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to mark this purchase request as a registered purchase order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#569DAA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      PostRequest({ url: "api/purchase_relation/completed" }, { relid: relid })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Successful!",
              "Purchase requests have been successfully registered as purchase orders.",
              "success"
            );
            setRefresh(true);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

export const handleOnBId = (relid, setRefresh) => {
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to mark this PR as On-Bidding? you will not be able to revert this.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#569DAA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      PostRequest({ url: "api/purchase_relation/received" }, { relid: relid })
        .then((res) => {
          if (res.status === 200) {
            PostRequest(
              { url: "api/purchase_relation/onBid" },
              { relid: relid }
            )
              .then((res) => {
                Swal.fire(
                  "Successful!",
                  "Purchase Requests Mark as On Bidding.",
                  "success"
                );
                setRefresh(true);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

export const handleReceive = (relid, setRefresh) => {
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to mark this PR as received? Delays will be calculated if the PR takes too long. Please note that delays for PRs that are not marked as received will also be recorded and saved.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#569DAA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      PostRequest({ url: "api/purchase_relation/received" }, { relid: relid })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Received!",
              "Purchase Requests Mark as Received.",
              "success"
            );
            setRefresh(true);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

export const handleSend = (relid, setRefresh, setHideDelay) => {
  Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to submit the (PR)? Please ensure that all requirements have been fulfilled before proceeding.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#569DAA",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      PostRequest({ url: "api/purchase_relation/send" }, { relid: relid })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire("Sent!", "Purchase Requests sent.", "success");
            setRefresh(true);
            setHideDelay(true);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

export const handleActions = (
  remarks,
  selectedbtn,
  relid,
  setRefresh,
  setHideDelay,
  setShowRemarks,
  setSelectedButton,
  setSelectBtn,
  setRemarks
) => {
  if (!remarks) {
    setAlertmessage("Please include remarks to proceed");
    setShowError(true);
  } else {
    let message = "";
    switch (selectedbtn) {
      case 3:
        message =
          "Are you sure you want to return this document (PR request) ? Once returned, you will not be able to revert it.";
        break;

      case 4:
        message =
          "Are you sure you want to cancel this document (PR request) ? Once cancelled, you will not be able to revert it.";
        break;
      case 5:
        //Attach Remarks
        message =
          "Are you sure you want to attach this remarks in this document (PR request) ? Once attached, you will not be able to modify it.";
        break;
    }

    Swal.fire({
      title: "Confirmation",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#569DAA",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        PostRequest(
          { url: "api/purchase_relation/actions" },
          { relid: relid, selectedbtn: selectedbtn, remarks: remarks }
        )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Sent!", "Purchase Requests sent.", "success");
              setRefresh(true);
              setHideDelay(true);
              setShowRemarks(false);
              setSelectedButton(null);
              setSelectBtn("");
              setRemarks("");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }
};
