module.exports = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    addNew: (_, args) => `new id is ${args.id}`,
  },
};
