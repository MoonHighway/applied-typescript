interface Creator {
  firstName: string;
  lastName: string;
  authored?: string[];
  created?: string[];
  directed?: string[];
  produced?: string[];
}

// ---- STEP 1 ----

console.log("\n>>>> STEP 1 <<<<\n");

const authors: Creator[] = [
  {
    firstName: "Harper",
    lastName: "Lee",
    authored: ["To Kill a Mockingbird", "Go Set a Watchman"],
  },
  {
    firstName: "Aldous",
    lastName: "Huxley",
    authored: ["Brave New World", "The Doors of Perception"],
  },
];

const artists: Creator[] = [
  {
    firstName: "Pink",
    lastName: "Floyd",
    created: ["The Dark Side of the Moon", "The Wall"],
  },
  {
    firstName: "Snoop",
    lastName: "Dogg",
    created: ["Tha Doggfather", "Coolaid"],
  },
];

const directors: Creator[] = [
  {
    firstName: "Christopher",
    lastName: "Nolan",
    directed: ["Inception", "Interstellar"],
  },
  {
    firstName: "Stanley",
    lastName: "Kubrick",
    directed: ["2001: A Space Odyssey", "A Clockwork Orange"],
  },
];

const producers: Creator[] = [
  {
    firstName: "Emma",
    lastName: "Thomas",
    produced: ["Inception", "Interstellar"],
  },
  {
    firstName: "Katharina",
    lastName: "Otto-Bernstein",
    produced: ["Absolute Wilson", "Beuys"],
  },
];

const creators: Record<string, Creator[]> = {
  authors,
  artists,
  directors,
  producers,
};

for (let creator of creators.authors) {
  console.log(
    `${creator.firstName} ${
      creator.lastName
    } is an author who wrote the books ${creator.authored.join(", ")}`
  );
}

for (let creator of creators.artists) {
  console.log(
    `${creator.firstName} ${
      creator.lastName
    } is an artist who created the albums ${creator.created.join(", ")}`
  );
}

for (let creator of creators.directors) {
  console.log(
    `${creator.firstName} ${
      creator.lastName
    } is a director who directed the movies ${creator.directed.join(", ")}`
  );
}

for (let creator of creators.producers) {
  console.log(
    `${creator.firstName} ${
      creator.lastName
    } is a producer who produced the movies ${creator.produced.join(", ")}`
  );
}

// ---- STEP 2 ----

console.log("\n>>>> STEP 2 <<<<\n");

const filmCreators: Creator[] = [...directors, ...producers];

for (let creator of filmCreators) {
  let creatorType = "<unknown>";
  let created: string[] = [];

  if (Array.isArray(creator.directed)) {
    creatorType = "director";
    created = creator.directed;
  } else if (Array.isArray(creator.produced)) {
    creatorType = "producer";
    created = creator.produced;
  }

  console.log(
    `${creator.firstName} ${
      creator.lastName
    } is a ${creatorType} who helped create ${created.join(", ")}`
  );
}
