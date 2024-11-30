import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const DeleteEvent = ({ eventId }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const confirmDelete = () => {
    toast({
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this event?",
      status: "warning",
      duration: null,
      isClosable: true,
      position: "top",
      render: ({ onClose }) => (
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>Are you sure you want to delete this event?</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDeleteEvent();
                onClose();
              }}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      ),
    });
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Event deleted.",
          description: "The event has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/");
      } else {
        throw new Error("Failed to delete the event.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue deleting the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error:", error);
    }
  };

  return (
    <Button colorScheme="red" onClick={confirmDelete}>
      Delete Event
    </Button>
  );
};
