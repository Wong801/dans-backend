import route from './route';

export default async ({ app }) => {
  await route({ app });
  return app;
};
