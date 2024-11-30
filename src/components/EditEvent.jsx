import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export const EditEvent = ({ event, listCategories, updateEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setEditedEvent((prev) => ({
      ...prev,
      categoryIds: value,
    }));
  };

  const handleEditEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedEvent),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        updateEvent(updatedEvent);
        toast({
          title: "Event updated.",
          description: "The event has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error("Failed to update the event.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue updating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Edit Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="Event Title"
                name="title"
                value={editedEvent.title}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Description"
                name="description"
                value={editedEvent.description}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={editedEvent.image}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Location"
                name="location"
                value={editedEvent.location}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Start Time (YYYY-MM-DDTHH:mm)"
                name="startTime"
                value={editedEvent.startTime}
                onChange={handleInputChange}
              />
              <Input
                placeholder="End Time (YYYY-MM-DDTHH:mm)"
                name="endTime"
                value={editedEvent.endTime}
                onChange={handleInputChange}
              />
              <Select
                placeholder="Select Categories"
                value={editedEvent.categoryIds.map(String)}
                onChange={handleCategoryChange}
              >
                {listCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEditEvent}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
