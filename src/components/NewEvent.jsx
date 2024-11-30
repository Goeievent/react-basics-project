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
} from "@chakra-ui/react";

export const NewEvent = ({ listCategories, addEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setNewEvent((prev) => ({
      ...prev,
      categoryIds: value,
    }));
  };

  const handleCreateEvent = async () => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const createdEvent = await response.json();
        addEvent(createdEvent);
        onClose();
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add New Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="Event Title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newEvent.image}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Start Time (YYYY-MM-DDTHH:mm)"
                name="startTime"
                value={newEvent.startTime}
                onChange={handleInputChange}
              />
              <Input
                placeholder="End Time (YYYY-MM-DDTHH:mm)"
                name="endTime"
                value={newEvent.endTime}
                onChange={handleInputChange}
              />
              <Select
                placeholder="Select Categories"
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
            <Button colorScheme="blue" onClick={handleCreateEvent}>
              Create
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
