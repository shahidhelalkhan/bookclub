import { AppDataSource } from '../config/typeorm.config';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const authorRepository = AppDataSource.getRepository(Author);
    const bookRepository = AppDataSource.getRepository(Book);

    await bookRepository.delete({});
    await authorRepository.delete({});
    console.log('Existing data cleared');

    const author1 = authorRepository.create({
      name: 'J.K. Rowling',
      bio: 'British author, best known for the Harry Potter series.',
    });

    const author2 = authorRepository.create({
      name: 'George Orwell',
      bio: 'English novelist and essayist, known for 1984 and Animal Farm.',
    });

    const author3 = authorRepository.create({
      name: 'Jane Austen',
      bio: 'English novelist known for her works of romantic fiction.',
    });

    await authorRepository.save([author1, author2, author3]);
    console.log('Authors seeded');

    const books = [
      bookRepository.create({
        title: "Harry Potter and the Philosopher's Stone",
        description: 'The first book in the Harry Potter series.',
        publishedYear: 1997,
        author: author1,
      }),
      bookRepository.create({
        title: 'Harry Potter and the Chamber of Secrets',
        description: 'The second book in the Harry Potter series.',
        publishedYear: 1998,
        author: author1,
      }),
      bookRepository.create({
        title: '1984',
        description: 'A dystopian social science fiction novel.',
        publishedYear: 1949,
        author: author2,
      }),
      bookRepository.create({
        title: 'Animal Farm',
        description: 'A satirical allegorical novella.',
        publishedYear: 1945,
        author: author2,
      }),
      bookRepository.create({
        title: 'Pride and Prejudice',
        description: 'A romantic novel of manners.',
        publishedYear: 1813,
        author: author3,
      }),
    ];

    await bookRepository.save(books);
    console.log('Books seeded');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
