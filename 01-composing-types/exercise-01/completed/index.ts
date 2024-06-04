interface Civilization<NotablePeopleType> {
  name: string;
  location: string;
  notablePeople: NotablePeopleType[];
}

interface Person {
  name: string;
  occupation: string;
}

type Architect = Person & { occupation: 'Architect' };
type Pharaoh = Person & { occupation: 'Pharaoh' };
type Poet = Person & { occupation: 'Poet' };
type Philosopher = Person & { occupation: 'Philosopher' };
type General = Person & { occupation: 'General' };

type NotablePeople<PersonType> = PersonType extends Person ? PersonType : never;

const egyptianCivilization: Civilization<NotablePeople<Architect | Pharaoh>> = {
  name: 'Egyptian',
  location: 'Africa',
  notablePeople: [
    {
      name: 'Cleopatra',
      occupation: 'Pharaoh',
    },
    {
      name: 'Imhotep',
      occupation: 'Architect',
    },
  ],
};

const greekCivilization: Civilization<NotablePeople<Poet | Philosopher>> = {
  name: 'Greek',
  location: 'Europe',
  notablePeople: [
    {
      name: 'Homer',
      occupation: 'Poet',
    },
    {
      name: 'Socrates',
      occupation: 'Philosopher',
    },
  ],
};

const romanCivilization: Civilization<NotablePeople<General | Poet>> = {
  name: 'Roman',
  location: 'Europe',
  notablePeople: [
    {
      name: 'Julius Caesar',
      occupation: 'General',
    },
    {
      name: 'Virgil',
      occupation: 'Poet',
    },
  ],
};
