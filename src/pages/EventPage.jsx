import { useState } from "react";
import {
  Center,
  Image,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useParams, Link, useLoaderData } from "react-router-dom";
import { DeleteEvent } from "../components/DeleteEvent";
import { EditEvent } from "../components/EditEvent";

export const loader = async () => {
  const eventsResponse = await fetch("http://localhost:3000/events");
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const usersResponse = await fetch("http://localhost:3000/users");

  return {
    listEvents: await eventsResponse.json(),
    listCategories: await categoriesResponse.json(),
    listUsers: await usersResponse.json(),
  };
};

export const EventPage = () => {
  const { listEvents, listCategories, listUsers } = useLoaderData();
  const { eventId } = useParams();

  const [events, setEvents] = useState(listEvents);

  const event = events.find((event) => String(event.id) === eventId);

  if (!event) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="lg" color="red.500">
          Event not found.
        </Text>
        <Link to="/">
          <Button colorScheme="blue" mt={4}>
            Go back to Recipe Overview
          </Button>
        </Link>
      </Box>
    );
  }

  // Update event
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const user = listUsers.find(
    (user) => String(user.id) === String(event.createdBy)
  );

  return (
    <Center bgColor="blue.100" h="100vh" flexWrap="wrap" display="flex">
      <Card borderRadius="xl" maxW="3xl" w="full" h="fit-content" p={[4, 6]}>
        <CardBody>
          <Image
            h={["15rem", "20rem"]}
            w="100%"
            src={event.image}
            borderRadius="xl"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {/* Left Column */}

              <GridItem>
                <Heading size="lg">{event.title}</Heading>
                <Text color="gray" fontWeight="600" pt={3}>
                  {event.description}
                </Text>
                {/* User  */}
                {user && (
                  <Flex direction="column" align="center" mt={10} gap={3}>
                    <Text fontSize="lg" fontWeight="bold">
                      Created by:
                    </Text>
                    <Image
                      src={user.image}
                      alt={user.name}
                      borderRadius="full"
                      boxSize="100px"
                    />
                    <Text fontWeight="bold">{user.name}</Text>
                  </Flex>
                )}
              </GridItem>

              {/* Right Column */}

              <GridItem>
                <Flex pt={3} gap={2} wrap="wrap">
                  <Flex gap={1} justify="start">
                    <Text fontWeight={"500"}>Start date and time:</Text>
                  </Flex>

                  <Flex gap={1} justify="start">
                    <Text>
                      {event.startTime ? event.startTime.slice(0, 10) : ""}
                    </Text>
                    <Text>at</Text>
                    <Text>
                      {event.startTime ? event.startTime.slice(11, 16) : ""}h
                    </Text>
                  </Flex>
                  <Flex gap={1} justify="end">
                    <Text fontWeight={"500"}>End date and time:</Text>
                  </Flex>
                  <Flex gap={1} justify="end">
                    <Text>
                      {event.endTime ? event.endTime.slice(0, 10) : ""}
                    </Text>
                    <Text>at</Text>
                    <Text>
                      {event.endTime ? event.endTime.slice(11, 16) : ""}h
                    </Text>
                  </Flex>
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
                </Flex>
                <Flex
                  justify="center"
                  align="center"
                  mt={9}
                  gap={4}
                  direction={{ base: "column", md: "row" }}
                >
                  <EditEvent
                    event={event}
                    listCategories={listCategories}
                    updateEvent={updateEvent}
                  />
                  <DeleteEvent eventId={event.id} />
                </Flex>
              </GridItem>
            </Grid>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
