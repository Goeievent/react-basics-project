import { useState } from "react";
import {
  Center,
  Heading,
  Text,
  Flex,
  Image,
  Card,
  CardBody,
  Stack,
  Box,
} from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { FilterEvents } from "../components/FilterEvents";
import { NewEvent } from "../components/NewEvent";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const listEvents = await fetch("http://localhost:3000/events");
  const listCategories = await fetch("http://localhost:3000/categories");

  return {
    listEvents: await listEvents.json(),
    listCategories: await listCategories.json(),
  };
};

export const EventsPage = () => {
  const { listEvents: initialEvents, listCategories } = useLoaderData();
  const [listEvents, setListEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addEvent = (newEvent) => {
    setListEvents((prev) => [...prev, newEvent]);
  };

  const filteredEvents = listEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      event.categoryIds.includes(parseInt(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  return (
    <Box bgColor="blue.100" minH="100vh" p={4}>
      <Center
        gap={8}
        h="full"
        bgColor="blue.100"
        flexWrap="wrap"
        display="flex"
        justify="space-between"
        marginY={1}
        paddingBottom={6}
      >
        <Heading mb={6} align="center">
          Events Overview
        </Heading>

        <NewEvent listCategories={listCategories} addEvent={addEvent} />

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <FilterEvents
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={listCategories}
        />

        {filteredEvents.length === 0 ? (
          <Text fontSize="lg" mt={4}>
            No recipes found.
          </Text>
        ) : (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              borderRadius="xl"
              maxW="sm"
              w="full"
              minH="37rem"
              cursor="pointer"
              _hover={{ transform: "scale(1.01)" }}
            >
              <Link to={`/event/${event.id}`}>
                <CardBody>
                  {/* Image */}
                  <Image h={64} w="100%" src={event.image} borderRadius="xl" />
                  <Stack mt="6" spacing="3" align="center">
                    <Heading size="md">{event.title}</Heading>
                    <Text color="gray" fontSize="sm">
                      {event.description}
                    </Text>

                    {/* Time Table */}
                    <Flex gap={1} justify="start">
                      <Text fontWeight={"500"}>Start date and time:</Text>
                      <Text>
                        {event.startTime ? event.startTime.slice(0, 10) : ""} at{" "}
                        {event.startTime ? event.startTime.slice(11, 16) : ""}h
                      </Text>
                    </Flex>
                    <Flex gap={1} justify="end">
                      <Text fontWeight={"500"}>End date and time:</Text>
                      <Text>
                        {event.endTime ? event.endTime.slice(0, 10) : ""} at{" "}
                        {event.endTime ? event.endTime.slice(11, 16) : ""}h
                      </Text>
                    </Flex>

                    {/* Categories */}
                    <Flex gap={3} mt={10}>
                      <Text>Category:</Text>
                      {event.categoryIds.map((categoryId) => {
                        const category = listCategories.find(
                          (cat) => cat.id === String(categoryId)
                        );
                        return category ? (
                          <div key={categoryId}>
                            <Text>{category.name}</Text>
                          </div>
                        ) : null;
                      })}
                    </Flex>
                  </Stack>
                </CardBody>
              </Link>
            </Card>
          ))
        )}
      </Center>
    </Box>
  );
};
